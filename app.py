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

    st.title("🎵 Relevar Catálogo")
    st.caption("Pegá el link del canal o Topic de un artista en YouTube y descargá "
               "el catálogo completo con distribuidora, reproducciones, ISRC y UPC.")

    if not yt_key:
        st.error("⚠️ Falta configurar `YOUTUBE_API_KEY` en el servidor. Avisá al administrador.")
        return
    if not (sp_id and sp_secret):
        st.warning("Spotify no está configurado: el relevamiento funciona igual, "
                   "pero sin los códigos ISRC/UPC.")

    url = st.text_input(
        "Link del canal / Topic",
        placeholder="https://www.youtube.com/channel/UC...   ó   https://www.youtube.com/@Artista")
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
            res = R.relevar(url.strip(), yt_key, sp_id, sp_secret, progress=progress)
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
