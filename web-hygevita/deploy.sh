#!/bin/bash
# deploy.sh - Despliegue de Hygevita web a Digital Ocean
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
ssh "$SERVER" "sudo mkdir -p /var/www/hygevita"
scp -r dist/* "$SERVER:/var/www/hygevita/"

echo "==> Subiendo configuración de Nginx..."
scp hygevita.conf "$SERVER:/tmp/hygevita.conf"

echo "==> Configurando servidor..."
ssh "$SERVER" << 'EOF'
sudo mv /tmp/hygevita.conf /etc/nginx/sites-available/hygevita
sudo ln -sf /etc/nginx/sites-available/hygevita /etc/nginx/sites-enabled/hygevita
sudo nginx -t && sudo systemctl reload nginx
EOF

echo ""
echo "==> Despliegue completado."
echo "    Accede a http://hygevita.com"
echo "    (Ejecuta certbot en el servidor para activar HTTPS)"
