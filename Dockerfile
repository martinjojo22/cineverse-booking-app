# OpenShift & Kubernetes-optimized Unprivileged NGINX
# Runs as non-root user (UID 101) and binds to unprivileged port 8080
FROM nginxinc/nginx-unprivileged:alpine

# Copy static frontend assets into standard web root
COPY --chown=101:0 index.html /usr/share/nginx/html/
COPY --chown=101:0 style.css /usr/share/nginx/html/
COPY --chown=101:0 app.js /usr/share/nginx/html/

# Expose standard unprivileged OpenShift web port
EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
