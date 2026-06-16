# Relevar Catálogo — App web

App web (Streamlit) que releva el catálogo de un artista de YouTube y devuelve un
dashboard + un Excel descargable con distribuidora, sello, reproducciones, **ISRC**
y **UPC**. Mismo motor que el plugin, pero sin Claude Code: se usa desde el navegador.

```
relevar-web/
├── app.py                      # la interfaz (Streamlit)
├── relevar_core.py             # el motor (YouTube Data API + Spotify)
├── distributors.py             # listas de clasificación de distribuidoras
├── requirements.txt
└── .streamlit/
    └── secrets.toml.ejemplo    # plantilla de claves (NO subir las reales)
```

---

## A) Probar local (en tu compu)

```bash
cd relevar-web
pip install -r requirements.txt
# copiá la plantilla y poné tus claves:
copy .streamlit\secrets.toml.ejemplo .streamlit\secrets.toml   # Windows
# (Mac/Linux: cp .streamlit/secrets.toml.ejemplo .streamlit/secrets.toml)
streamlit run app.py
```

Se abre solo en el navegador (http://localhost:8501).

---

## B) Publicarla como sitio web (gratis, Streamlit Community Cloud)

Así el equipo entra por un link, sin instalar nada.

### 1. Subí el código a GitHub (una vez)
Creá un repo (puede ser **privado**) con el contenido de `relevar-web/`.
**No subas claves**: el `.gitignore` ya excluye `secrets.toml`.

```bash
cd relevar-web
git init && git add . && git commit -m "App relevar catálogo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/relevar-catalogo-web.git
git push -u origin main
```

### 2. Deploy en Streamlit Cloud
1. Entrá a **https://share.streamlit.io** e iniciá sesión con GitHub.
2. **"Create app"** → elegí tu repo, branch `main`, y **Main file path** = `app.py`.
3. Antes de deployar (o después, en **Settings → Secrets**), pegá tus claves en
   formato TOML:
   ```toml
   YOUTUBE_API_KEY = "AIza..."
   SPOTIFY_CLIENT_ID = "..."
   SPOTIFY_CLIENT_SECRET = "..."
   APP_PASSWORD = "la-contraseña-del-equipo"
   ```
4. **Deploy.** En 1–2 minutos te da una URL tipo `https://relevar-catalogo.streamlit.app`.

### 3. Compartí con el equipo
Mandales la URL + la **contraseña** (`APP_PASSWORD`). Entran, pegan el link del
artista y descargan el Excel. No instalan nada.

> Para actualizar la app: `git push` los cambios → Streamlit Cloud redeploya solo.

---

## Notas
- Las claves viven en los **Secrets del servidor**, nunca en el código ni en el repo.
- La `APP_PASSWORD` es la barrera de acceso (la app es un link público; la
  contraseña evita que entre cualquiera). Si la dejás vacía, queda abierta.
- Cuota: ~12–21 consultas de YouTube por catálogo (de 10.000/día). Una sola clave
  alcanza para todo el equipo.
- **ISRC/UPC**: se completan vía Spotify por coincidencia (artista + título +
  duración). Si un código queda vacío es porque no hubo match confiable.
