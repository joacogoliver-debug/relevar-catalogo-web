@echo off
REM ==========================================================================
REM  Relevar Catalogo - Abrir la app en TU compu (local)
REM  >>> DOBLE CLIC <<<  (se abre sola en el navegador)
REM ==========================================================================
cd /d "%~dp0"
echo Instalando/actualizando dependencias (solo la primera vez tarda)...
python -m pip install --quiet -r requirements.txt
echo Abriendo la app... (para cerrarla, cerra esta ventana)
python -m streamlit run app.py
pause
