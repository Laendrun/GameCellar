#!/bin/sh
set -e

# 1) Render the templated Nginx conf
envsubst '${DOMAIN}' \
  < /etc/nginx/conf.d/default.conf.tpl \
  > /etc/nginx/conf.d/default.conf

# 2) Start nginx in the background so Certbot can connect
nginx -g 'daemon on;'

# 3) Only on first run, obtain the certs (idempotent thereafter)
#    You might guard this so it only runs once, or always renew
if [ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  certbot --nginx \
    --noninteractive \
    --agree-tos \
    --redirect \
    --email "${LETSENCRYPT_EMAIL}" \
    -d "${DOMAIN}"
fi

# 4) Finally, bring nginx to the foreground (the CMD)
exec "$@"
