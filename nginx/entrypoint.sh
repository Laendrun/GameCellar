#!/bin/sh
set -e

# 1) render template → real conf
envsubst '${DOMAIN}' \
  < /etc/nginx/conf.d/default.conf.tpl \
  > /etc/nginx/conf.d/default.conf

# 2) start nginx in background
nginx -g 'daemon on;'

# 3) obtain certs on first-run
if [ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  certbot --nginx \
    --noninteractive \
    --agree-tos \
    --redirect \
    --email "${LETSENCRYPT_EMAIL}" \
    -d "${DOMAIN}"
fi

# 4) gracefully stop the background nginx
nginx -s quit

# 5) exec nginx in the foreground
exec nginx -g 'daemon off;'
