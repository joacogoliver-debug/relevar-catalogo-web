# Relevar Catálogo — Web (diseño MOJO)

Web a medida con la identidad de **MOJO LATAM** (amarillo `#F5DA00` + negro, tipografías
Alegreya), implementada desde el handoff de **Claude Design**. Reemplaza la app de
Streamlit por una interfaz propia: pantalla inicial → carga → dashboard, con descarga de Excel.

- **Frontend**: design system de MOJO (React vía CDN + Babel, sin build step) en `static/`.
- **Backend**: FastAPI (`server.py`) que sirve el frontend y expone el motor
  (`relevar_core.py`, YouTube Data API + Deezer) como API.

```
relevar-web-app/
├── server.py            # FastAPI: sirve el frontend + /api/relevar
├── relevar_core.py      # motor (YouTube + Deezer)  ·  distributors.py
├── requirements.txt
├── LANZAR_LOCAL.bat     # doble clic para correr en tu compu
└── static/              # el frontend (design system MOJO)
    ├── index.html · styles.css · _ds_bundle.js · tokens/ · assets/
    └── screens/         # InitialScreen / LoadingScreen / ResultsScreen
```

---

## A) Probar local
**Windows:** doble clic en `LANZAR_LOCAL.bat` (toma tu YouTube key del config del instalador).
Se abre en http://localhost:8000.

**Manual:**
```bash
cd relevar-web-app
pip install -r requirements.txt
set YOUTUBE_API_KEY=AIza...        # Windows (Mac/Linux: export YOUTUBE_API_KEY=...)
uvicorn server:app --reload --port 8000
```

## B) Publicarla gratis (Render)

> Streamlit Cloud **no** sirve para esto (solo corre apps Streamlit). Para FastAPI,
> la opción gratis más simple es **Render**. Alternativas: Hugging Face Spaces, Fly.io.

1. Subí esta carpeta a un repo de GitHub.
2. En **https://render.com** → **New → Web Service** → conectá el repo.
3. Configuración:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. **Environment** (variables):
   - `YOUTUBE_API_KEY` = tu clave de YouTube
   - `APP_PASSWORD` = contraseña del equipo (opcional; si la ponés, la app pide login)
5. Deploy → te da una URL `https://….onrender.com`. Compartila al equipo.

> El free tier de Render "duerme" tras inactividad: el primer acceso del día puede
> tardar ~30s en despertar. Para uso interno alcanza.

---

## Notas
- **Claves**: solo `YOUTUBE_API_KEY` (los ISRC/UPC salen de Deezer, sin clave).
- `APP_PASSWORD` activa un gate simple para que solo entre el equipo.
- El frontend usa React + Babel desde CDN (sin compilar) para mantenerse fiel al
  handoff de Claude Design y sin toolchain.
