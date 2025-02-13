@echo off
echo 🔥 Eliminando contenedor y volúmenes...
docker compose down -v

echo 🚀 Iniciando contenedor...
docker compose up --build -d

echo ⏳ Esperando 5 segundos para asegurar que el contenedor esté listo...
timeout /t 5 /nobreak >nul

echo 🌱 Ejecutando el seed...
docker exec sistema-pos-backend-backend-1 npm run seed

echo ✅ Proceso completado.
pause
