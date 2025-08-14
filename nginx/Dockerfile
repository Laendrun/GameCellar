# nginx/Dockerfile
FROM nginx:stable-alpine

# install Certbot + Nginx plugin and gettext for templating
RUN apk add --no-cache \
      gettext \
      certbot \
      certbot-nginx \
      openssl

# copy your Nginx template
COPY conf.d/default.conf.tpl /etc/nginx/conf.d/default.conf.tpl
COPY conf.d/ratelimits.conf /etc/nginx/conf.d/ratelimits.conf

# entry script: render config, start nginx in background, run certbot then foreground nginx
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
