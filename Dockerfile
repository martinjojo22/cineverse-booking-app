# Official Red Hat Enterprise Universal Base Image for OpenShift & Kubernetes
FROM registry.access.redhat.com/ubi9/nginx-122

# Ensure proper group ownership for OpenShift arbitrary non-root UIDs
USER 0
COPY index.html style.css app.js /opt/app-root/src/
RUN chown -R 1001:0 /opt/app-root/src && chmod -R g+rwX /opt/app-root/src
USER 1001

# Standard unprivileged OpenShift port
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
