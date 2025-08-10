#!/bin/sh
set -e

# 1) render template → real conf
envsubst '${DOMAIN}' \
  < /etc/nginx/conf.d/default.conf.tpl \
  > /etc/nginx/conf.d/default.conf

nginx -g 'daemon on;'

certbot --nginx \
  --noninteractive \
  --agree-tos \
  --redirect \
  --email "${LETSENCRYPT_EMAIL}" \
  -d "${DOMAIN}"


nginx -s quit
exec nginx -g 'daemon off;'
