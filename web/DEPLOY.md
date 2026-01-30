# Despliegue MedFarmaSoft Web - Digital Ocean + GoDaddy

## Requisitos previos
- Droplet Digital Ocean con Ubuntu 24.04
- Dominios `medfarmasoft.es` y `medfarmasoft.com` en GoDaddy
- Acceso SSH al Droplet (`ssh root@TU_IP_DROPLET`)

---

## Paso 1: Configurar DNS en GoDaddy

### Dominio medfarmasoft.es
1. Entra en [GoDaddy DNS Manager](https://dnsadmin.godaddy.com/)
2. Selecciona el dominio `medfarmasoft.es`
3. Edita/crea estos registros DNS:

| Tipo  | Nombre | Valor              | TTL     |
|-------|--------|--------------------|---------|
| A     | @      | `TU_IP_DROPLET`    | 600     |
| CNAME | www    | `medfarmasoft.es`  | 1 hora  |

### Dominio medfarmasoft.com (redirección a .es)
1. Selecciona el dominio `medfarmasoft.com`
2. Edita/crea estos registros DNS:

| Tipo  | Nombre | Valor              | TTL     |
|-------|--------|--------------------|---------|
| A     | @      | `TU_IP_DROPLET`    | 600     |
| CNAME | www    | `medfarmasoft.com` | 1 hora  |

> Ambos dominios deben apuntar a la misma IP. Nginx se encarga de redirigir `.com` a `.es`.

4. Elimina cualquier registro A o CNAME existente que apunte a otro sitio
5. Espera unos minutos a que propaguen los DNS

---

## Paso 2: Preparar el servidor (SSH al Droplet)

Conéctate al Droplet:
```bash
ssh root@TU_IP_DROPLET
```

Instala Nginx y Certbot:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx
```

Crea el directorio de la web:
```bash
sudo mkdir -p /var/www/medfarmasoft
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
cd c:\temp\medfarmasoft\web
bash deploy.sh root@TU_IP_DROPLET
```

### Opción B: Manual
```bash
# Build
cd c:\temp\medfarmasoft\web
npm run build

# Subir archivos
scp -r dist/* root@TU_IP_DROPLET:/var/www/medfarmasoft/

# Subir config Nginx
scp medfarmasoft.conf root@TU_IP_DROPLET:/tmp/medfarmasoft.conf
```

Luego en el servidor (SSH):
```bash
sudo mv /tmp/medfarmasoft.conf /etc/nginx/sites-available/medfarmasoft
sudo ln -sf /etc/nginx/sites-available/medfarmasoft /etc/nginx/sites-enabled/medfarmasoft
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## Paso 4: Activar HTTPS con Let's Encrypt (en el servidor)

```bash
sudo certbot --nginx -d medfarmasoft.es -d www.medfarmasoft.es -d medfarmasoft.com -d www.medfarmasoft.com
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

- Abre `https://medfarmasoft.es` en el navegador
- Verifica que `http://medfarmasoft.es` redirige a HTTPS
- Verifica que `https://www.medfarmasoft.es` funciona
- Verifica que `https://medfarmasoft.com` redirige a `https://medfarmasoft.es`

---

## Redespliegues futuros

Cada vez que hagas cambios en la web, solo ejecuta:
```bash
cd c:\temp\medfarmasoft\web
bash deploy.sh root@TU_IP_DROPLET
```

O manualmente:
```bash
npm run build
scp -r dist/* root@TU_IP_DROPLET:/var/www/medfarmasoft/
```

No necesitas tocar Nginx ni Certbot de nuevo.

---

## Paso futuro: Añadir API (api.medfarmasoft.es)

Cuando necesites añadir un backend/API al mismo Droplet:

### 1. DNS en GoDaddy
Añade un registro para el subdominio `api`:

| Tipo  | Nombre | Valor              | TTL     |
|-------|--------|--------------------|---------|
| A     | api    | `TU_IP_DROPLET`    | 600     |

### 2. Ampliar el certificado SSL (en el servidor)
```bash
sudo certbot --nginx -d api.medfarmasoft.es
```
Certbot añade el nuevo dominio al certificado existente.

### 3. Configurar Nginx como proxy inverso
Crear `/etc/nginx/sites-available/api-medfarmasoft`:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.medfarmasoft.es;

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
sudo ln -sf /etc/nginx/sites-available/api-medfarmasoft /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.medfarmasoft.es
```

> Ajusta el puerto `3000` según el framework que uses (Express, Fastify, ASP.NET, etc.).
