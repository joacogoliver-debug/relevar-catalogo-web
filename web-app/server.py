"""
server.py — Web real de Relevar Catálogo (FastAPI), con el diseño MOJO.

Sirve el frontend del design system (static/) y expone el motor (relevar_core)
como API. Reemplaza la app de Streamlit por una web a medida con la marca MOJO.

Endpoints:
  GET  /                -> el frontend (static/index.html)
  GET  /api/config      -> { needs_password }
  POST /api/login       -> valida la contraseña del equipo
  POST /api/relevar     -> releva un canal y devuelve el dashboard + Excel (base64)

Claves (variables de entorno):
  YOUTUBE_API_KEY  (obligatoria)   ·   APP_PASSWORD (opcional, gate del equipo)

Correr local:   uvicorn server:app --reload --port 8000
"""

import base64
import os

from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import relevar_core as R

HERE = os.path.dirname(os.path.abspath(__file__))
STATIC = os.path.join(HERE, "static")

app = FastAPI(title="Relevar Catálogo · MOJO")


def _yt_key():
    k = os.environ.get("YOUTUBE_API_KEY", "")
    if k:
        return k
    # Fallback para correr local: la key que dejó el instalador en el home.
    p = os.path.join(os.path.expanduser("~"), ".relevar-catalogo", ".env")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8-sig"):
            if line.strip().startswith("YOUTUBE_API_KEY="):
                return line.split("=", 1)[1].strip()
    return ""


def _password():
    return os.environ.get("APP_PASSWORD", "")


def _check_password(supplied):
    expected = _password()
    if expected and supplied != expected:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta.")


# ============================================================
# Formateo al contrato de datos del diseño (kpis / distribs / top10)
# ============================================================

def _fmt_int(n):
    return f"{int(n):,}".replace(",", ".")  # es-AR: punto de miles


def _fmt_compact(n):
    n = int(n or 0)
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K"
    return str(n)


def _fmt_fecha(iso):
    """'YYYY-MM-DD' -> 'DD/MM' (día/mes)."""
    if iso and len(iso) >= 10:
        return f"{iso[8:10]}/{iso[5:7]}"
    return ""


def _display_dist(name):
    low = R._normalize(name)
    if "mojo" in low:
        return "MOJO LATAM"
    if "orchard" in low:
        return "The Orchard"
    return name


def to_payload(res):
    tracks = res["tracks"]
    total = len(tracks)
    codes = res["codes"] or {}

    # Distribuidoras: fusionar variantes (ej. "MOJO LATAM LLC" / "Mojo Latam LLC")
    merged = {}
    for raw, v in res["distribs"].items():
        name = _display_dist(raw)
        m = merged.setdefault(name, {"productos": 0, "views": 0})
        m["productos"] += v["videos"]
        m["views"] += v["views"]
    distribs = sorted(
        ({"name": name, "productos": d["productos"],
          "pct": round(d["productos"] / total * 100) if total else 0,
          "views": _fmt_compact(d["views"])}
         for name, d in merged.items()),
        key=lambda r: r["productos"], reverse=True)

    top = sorted(tracks, key=lambda t: t["views"], reverse=True)[:10]
    top10 = [{"n": i + 1, "track": t["track"], "album": t["album"],
              "dist": _display_dist(t["distributor"]),
              "views": _fmt_int(t["views"]), "isrc": t["isrc"] or "—",
              "upc": t["upc"] or "—", "year": t["release_year"] or "",
              "fecha": _fmt_fecha(t["upload_date"])} for i, t in enumerate(top)]

    has_mojo = any(d["name"] == "MOJO LATAM" for d in distribs)

    albumes = len({t["album"] for t in tracks})
    isrc_kpi = f"{codes.get('isrc', 0)}/{total}" if codes else "—"

    return {
        "artist": res["artist"],
        "channelTitle": res["channel_title"],
        "withCodes": bool(codes),
        "kpis": {
            "productos": _fmt_int(total),
            "reproducciones": _fmt_int(res["total_views"]),
            "albumes": _fmt_int(albumes),
            "isrc": isrc_kpi,
        },
        "distribs": distribs,
        "top10": top10,
        "hasMojo": has_mojo,
        "viaTopic": res.get("via_topic", False),
        "codes": codes or None,
        "excelB64": base64.b64encode(R.workbook_bytes(tracks, res["artist"])).decode(),
        "filename": f"Catalogo_{R.slugify(res['artist'])}.xlsx",
    }


# ============================================================
# API
# ============================================================

class RelevarReq(BaseModel):
    url: str
    with_codes: bool = True


class LoginReq(BaseModel):
    password: str = ""


@app.get("/api/config")
def config():
    return {"needs_password": bool(_password())}


@app.post("/api/login")
def login(body: LoginReq):
    _check_password(body.password)
    return {"ok": True}


@app.post("/api/relevar")
def relevar(body: RelevarReq, x_app_password: str = Header(default="")):
    _check_password(x_app_password)
    if not _yt_key():
        raise HTTPException(status_code=500,
                            detail="Falta configurar YOUTUBE_API_KEY en el servidor.")
    if not body.url.strip():
        raise HTTPException(status_code=400, detail="Pegá el link de un canal.")
    try:
        res = R.relevar(body.url.strip(), _yt_key(), with_codes=body.with_codes)
    except R.RelevarError as e:
        raise HTTPException(status_code=422, detail=str(e))
    return to_payload(res)


# ============================================================
# Frontend estático (debe ir DESPUÉS de las rutas /api)
# ============================================================

@app.get("/")
def index():
    return FileResponse(os.path.join(STATIC, "index.html"))


app.mount("/", StaticFiles(directory=STATIC), name="static")
