#!/bin/bash
# deploy.sh - Despliegue de MedFarmaSoft web a Digital Ocean
# Uso: bash deploy.sh usuario@IP_DEL_DROPLET

set -e

if [ -z "$1" ]; then
  echo "Uso: bash deploy.sh usuario@IP_DEL_DROPLET"
  echo "Ejemplo: bash deploy.sh root@143.198.xx.xx"
  exit 1
fi

SERVER=$1

echo "==> Construyendo la web..."
npm run build

echo "==> Subiendo archivos al servidor..."
scp -r dist/* "$SERVER:/var/www/medfarmasoft/"

echo "==> Subiendo configuración de Nginx..."
scp medfarmasoft.conf "$SERVER:/tmp/medfarmasoft.conf"

echo "==> Configurando servidor..."
ssh "$SERVER" << 'EOF'
sudo mv /tmp/medfarmasoft.conf /etc/nginx/sites-available/medfarmasoft
sudo ln -sf /etc/nginx/sites-available/medfarmasoft /etc/nginx/sites-enabled/medfarmasoft
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
EOF

echo ""
echo "==> Despliegue completado."
echo "    Accede a http://medfarmasoft.es"
echo "    (Ejecuta certbot en el servidor para activar HTTPS)"
