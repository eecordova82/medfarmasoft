# Despliegue Hygevita Web - Digital Ocean + GoDaddy

> Hygevita es una aplicación de **MedFarmaSoft**. Esta guía cubre el despliegue del frontend en `hygevita.com` y `hygevita.app`.

## Requisitos previos
- Droplet Digital Ocean con Ubuntu 24.04 (puede ser el mismo que medfarmasoft.es)
- Dominios `hygevita.com` y `hygevita.app` en GoDaddy
- Acceso SSH al Droplet (`ssh root@TU_IP_DROPLET`)

---

## Paso 1: Configurar DNS en GoDaddy

### Dominio hygevita.com
1. Entra en [GoDaddy DNS Manager](https://dnsadmin.godaddy.com/)
2. Selecciona el dominio `hygevita.com`
3. Edita/crea estos registros DNS:

| Tipo  | Nombre | Valor              | TTL     |
|-------|--------|--------------------|---------|
| A     | @      | `TU_IP_DROPLET`    | 600     |
| CNAME | www    | `hygevita.com`     | 1 hora  |

### Dominio hygevita.app
1. Selecciona el dominio `hygevita.app`
2. Edita/crea estos registros DNS:

| Tipo  | Nombre | Valor              | TTL     |
|-------|--------|--------------------|---------|
| A     | @      | `TU_IP_DROPLET`    | 600     |
| CNAME | www    | `hygevita.app`     | 1 hora  |

> Ambos dominios deben apuntar al mismo Droplet. Nginx sirve el mismo contenido para los dos.

4. Elimina cualquier registro A o CNAME existente que apunte a otro sitio
5. Espera unos minutos a que propaguen los DNS

---

## Paso 2: Preparar el servidor (SSH al Droplet)

Conéctate al Droplet:
```bash
ssh root@TU_IP_DROPLET
```

Si es un Droplet nuevo, instala Nginx y Certbot:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx
```

Crea el directorio de la web:
```bash
sudo mkdir -p /var/www/hygevita
```

Verifica que Nginx funciona:
```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

Abre el firewall (si usas UFW):
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## Paso 3: Desplegar la web (desde tu PC local)

### Opción A: Script automático
```bash
cd c:\temp\medfarmasoft\web-hygevita
bash deploy.sh root@TU_IP_DROPLET
```

### Opción B: Manual
```bash
# Build
cd c:\temp\medfarmasoft\web-hygevita
npm run build

# Subir archivos
scp -r dist/* root@TU_IP_DROPLET:/var/www/hygevita/

# Subir config Nginx
scp hygevita.conf root@TU_IP_DROPLET:/tmp/hygevita.conf
```

Luego en el servidor (SSH):
```bash
sudo mv /tmp/hygevita.conf /etc/nginx/sites-available/hygevita
sudo ln -sf /etc/nginx/sites-available/hygevita /etc/nginx/sites-enabled/hygevita
sudo nginx -t
sudo systemctl reload nginx
```

---

## Paso 4: Activar HTTPS con Let's Encrypt (en el servidor)

```bash
sudo certbot --nginx -d hygevita.com -d www.hygevita.com -d hygevita.app -d www.hygevita.app
```

- Introduce tu email cuando lo pida
- Acepta los términos de servicio
- Selecciona redirigir HTTP a HTTPS (opción 2)

Certbot renovará automáticamente el certificado. Puedes verificarlo:
```bash
sudo certbot renew --dry-run
```

---

## Paso 5: Verificar

- Abre `https://hygevita.com` en el navegador
- Verifica que `http://hygevita.com` redirige a HTTPS
- Verifica que `https://www.hygevita.com` funciona
- Repite para `hygevita.app`

---

## Redespliegues futuros

Cada vez que hagas cambios en la web, solo ejecuta:
```bash
cd c:\temp\medfarmasoft\web-hygevita
bash deploy.sh root@TU_IP_DROPLET
```

O manualmente:
```bash
npm run build
scp -r dist/* root@TU_IP_DROPLET:/var/www/hygevita/
```

No necesitas tocar Nginx ni Certbot de nuevo.

---

## Variables de entorno (opcional)

Configura el endpoint de la API antes del build:

```bash
# .env.production
VITE_API_BASE=https://api.hygevita.com
VITE_TURNSTILE_SITE_KEY=tu_clave_aqui
```

Si Hygevita comparte backend con MedFarmaSoft puedes usar:
```bash
VITE_API_BASE=https://api.medfarmasoft.es
```

---

## Paso futuro: Añadir API (api.hygevita.com)

Cuando necesites añadir un backend/API al mismo Droplet:

### 1. DNS en GoDaddy
Añade un registro para el subdominio `api`:

| Tipo  | Nombre | Valor              | TTL     |
|-------|--------|--------------------|---------|
| A     | api    | `TU_IP_DROPLET`    | 600     |

### 2. Ampliar el certificado SSL (en el servidor)
```bash
sudo certbot --nginx -d api.hygevita.com
```

### 3. Configurar Nginx como proxy inverso
Crear `/etc/nginx/sites-available/api-hygevita`:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.hygevita.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar el sitio:
```bash
sudo ln -sf /etc/nginx/sites-available/api-hygevita /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.hygevita.com
```

> Ajusta el puerto `3000` según el framework que uses (Express, Fastify, ASP.NET, etc.).
