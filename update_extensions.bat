@echo off
setlocal enabledelayedexpansion

echo Iniciando la conversion de archivos .js a .ts...

set "counter=0"

for /r %%F in (*.js) do (
    set "oldname=%%F"
    set "newname=%%~dpnF.ts"
    
    if exist "!newname!" (
        echo Advertencia: !newname! ya existe. Saltando...
    ) else (
        ren "!oldname!" "%%~nF.ts"
        set /a "counter+=1"
        echo Convertido: !oldname! a !newname!
    )
)

echo.
echo Conversion completada. %counter% archivos convertidos.
pause