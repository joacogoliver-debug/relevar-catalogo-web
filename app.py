"""
app.py — Relevar Catálogo (app web Streamlit).

Pegás el link del canal/Topic de un artista y devuelve un dashboard + un Excel
descargable con distribuidora, sello, reproducciones, ISRC y UPC.

Las claves se leen de los "secrets" del servidor (nunca van en el código):
    YOUTUBE_API_KEY, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, APP_PASSWORD
"""

import os
import streamlit as st

import relevar_core as R

st.set_page_config(page_title="Relevar Catálogo · Mojo", page_icon="🎵", layout="wide")

_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
html, body, [class*="css"], button, input { font-family: 'Inter', sans-serif; }

/* Ocultar el chrome por defecto de Streamlit */
#MainMenu, footer, [data-testid="stToolbar"], [data-testid="stDecoration"] { visibility: hidden; }

.block-container { padding-top: 2.2rem; padding-bottom: 4rem; max-width: 1080px; }

/* Header */
.hero {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #DB2777 100%);
  color: #fff; padding: 30px 34px; border-radius: 20px; margin-bottom: 1.6rem;
  box-shadow: 0 10px 30px rgba(79,70,229,.25);
}
.hero h1 { color:#fff; margin:0; font-size:2.05rem; font-weight:800; letter-spacing:-.5px; }
.hero p  { color:#EDE9FE; margin:.45rem 0 0; font-size:1.02rem; max-width:680px; }

/* Tarjetas de métricas */
[data-testid="stMetric"] {
  background:#FFFFFF; border:1px solid #ECECF3; border-radius:16px;
  padding:18px 20px; box-shadow:0 1px 3px rgba(16,24,40,.04);
}
[data-testid="stMetricLabel"] { opacity:.65; font-weight:600; font-size:.8rem; text-transform:uppercase; letter-spacing:.4px; }
[data-testid="stMetricValue"] { font-weight:800; }

/* Botones */
.stButton>button, .stDownloadButton>button {
  border-radius:11px; font-weight:700; padding:.55rem 1.1rem; border:none;
}
.stDownloadButton>button { background:#16A34A; color:#fff; }

/* Subtítulos de sección */
h3 { font-weight:700; margin-top:1.6rem; }
hr { margin:1.4rem 0; }
</style>
"""
st.markdown(_CSS, unsafe_allow_html=True)


def secret(name, default=""):
    """Lee un secreto del servidor (st.secrets) o de variables de entorno."""
    try:
        if name in st.secrets:
            return st.secrets[name]
    except Exception:
        pass
    return os.environ.get(name, default)


def check_password():
    """Puerta de acceso con la contraseña del equipo. Si no hay APP_PASSWORD
    configurada, el acceso queda abierto (modo local/desarrollo)."""
    expected = secret("APP_PASSWORD")
    if not expected:
        return True
    if st.session_state.get("auth_ok"):
        return True
    st.title("🎵 Relevar Catálogo")
    st.caption("Herramienta interna de Mojo Latam")
    pw = st.text_input("Contraseña del equipo", type="password")
    if pw:
        if pw == expected:
            st.session_state["auth_ok"] = True
            st.rerun()
        else:
            st.error("Contraseña incorrecta.")
    return False


def fmt(n):
    try:
        return f"{int(n):,}".replace(",", ".")
    except Exception:
        return str(n)


def main():
    if not check_password():
        return

    yt_key = secret("YOUTUBE_API_KEY")
    sp_id = secret("SPOTIFY_CLIENT_ID")
    sp_secret = secret("SPOTIFY_CLIENT_SECRET")

    st.markdown(
        '<div class="hero"><h1>🎵 Relevar Catálogo</h1>'
        '<p>Pegá el link del canal o Topic de un artista en YouTube y descargá '
        'su catálogo completo: distribuidora, reproducciones y, si querés, los '
        'códigos ISRC y UPC.</p></div>',
        unsafe_allow_html=True)

    if not yt_key:
        st.error("⚠️ Falta configurar `YOUTUBE_API_KEY` en el servidor. Avisá al administrador.")
        return

    spotify_available = bool(sp_id and sp_secret)

    url = st.text_input(
        "Link del canal / Topic",
        placeholder="https://www.youtube.com/channel/UC...   ó   https://www.youtube.com/@Artista")

    if spotify_available:
        con_codigos = st.checkbox(
            "Buscar códigos ISRC y UPC en Spotify",
            value=True,
            help="Agrega ISRC (por canción) y UPC (por álbum). Tarda un poco más; "
                 "si no los necesitás, destildalo para ir más rápido.")
    else:
        con_codigos = False
        st.caption("ℹ️ Spotify no está configurado en el servidor: el relevamiento "
                   "funciona igual, pero sin códigos ISRC/UPC.")

    go = st.button("Relevar catálogo", type="primary", disabled=not url)

    # Solo se releva al apretar el botón; el resultado queda guardado para que
    # los re-renders (ej. clic en Descargar) no vuelvan a consultar las APIs.
    if go and url:
        box = st.empty()
        bar = st.progress(0.0)

        def progress(msg, frac):
            box.info(msg)
            bar.progress(min(max(frac, 0.0), 1.0))

        try:
            res = R.relevar(
                url.strip(), yt_key,
                sp_id if con_codigos else None,
                sp_secret if con_codigos else None,
                progress=progress)
        except R.RelevarError as e:
            bar.empty(); box.empty()
            st.error(str(e))
            return
        except Exception as e:  # noqa: BLE001
            bar.empty(); box.empty()
            st.error(f"Ocurrió un error inesperado: {e}")
            return
        bar.empty(); box.empty()
        st.session_state["res"] = res
        st.session_state["xlsx"] = R.workbook_bytes(res["tracks"], res["artist"])

    if st.session_state.get("res"):
        _render(st.session_state["res"], st.session_state.get("xlsx"))


def _render(res, xlsx):
    tracks = res["tracks"]
    total = len(tracks)
    sp = res["spotify"] or {}

    st.success(f"✅ {res['artist']} — {total} productos relevados.")

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Productos", fmt(total))
    c2.metric("Reproducciones", fmt(res["total_views"]))
    c3.metric("Álbumes", fmt(len({t["album"] for t in tracks})))
    c4.metric("Con ISRC", f"{sp.get('isrc', 0)}/{total}" if sp else "—")

    st.subheader("Distribución por distribuidora")
    dist_rows = sorted(
        ({"Distribuidora": k, "Productos": v["videos"], "Reproducciones": v["views"]}
         for k, v in res["distribs"].items()),
        key=lambda r: r["Productos"], reverse=True)
    colA, colB = st.columns([2, 3])
    with colA:
        st.dataframe(dist_rows, hide_index=True, width="stretch")
    with colB:
        st.bar_chart({r["Distribuidora"]: r["Productos"] for r in dist_rows})

    st.subheader("Top 10 por reproducciones")
    top = sorted(tracks, key=lambda t: t["views"], reverse=True)[:10]
    st.dataframe(
        [{"Track": t["track"], "Álbum": t["album"], "Distribuidora": t["distributor"],
          "Reproducciones": t["views"], "ISRC": t["isrc"], "Año": t["release_year"]}
         for t in top],
        hide_index=True, width="stretch")

    st.subheader("Descargar")
    if xlsx is None:
        xlsx = R.workbook_bytes(tracks, res["artist"])
    st.download_button(
        "⬇️ Descargar Excel completo",
        data=xlsx,
        file_name=f"Catalogo_{R.slugify(res['artist'])}.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        type="primary")
    if sp:
        st.caption(f"Spotify: {sp.get('matched', 0)}/{total} matcheados · "
                   f"ISRC {sp.get('isrc', 0)} · UPC {sp.get('upc', 0)}. "
                   "Si un código queda vacío es porque no hubo coincidencia confiable.")


main()
