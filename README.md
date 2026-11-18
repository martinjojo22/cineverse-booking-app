# 🎬 CineVerse - Cloud Cinema Ticket Booking App

An ultra-modern, responsive movie ticket booking application built with pure **HTML5, CSS3/Tailwind, and Vanilla JavaScript**. Designed specifically for **zero-backend minimal footprints**, instant loading speeds, and seamless deployment on **Red Hat OpenShift** and **Kubernetes**.

---

## ✨ Features

- **Cinematic Dark UI**: Glassmorphic panels, neon glows, and curved 3D cinema screen perspective.
- **Dynamic Seating Matrix**:
  - Interactive seat map with VIP rows, Standard rows, and realistic occupied seats.
  - Multi-seat selection with real-time price calculation.
- **Date & Showtime Switcher**: Interactive date pills and screening times.
- **Concessions & Add-ons**: Popcorn, nachos, and craft soda add-ons that dynamically tally into the cart.
- **Digital Boarding Pass Ticket**:
  - Perforated cinema pass styling with booking reference (`CV-XXXXX`).
  - Contactless simulated QR pass code.
  - One-click print / PDF export.
- **Persistent Local History**: "My Tickets" drawer saved in browser `localStorage` (no backend database required).
- **Zero Build Step**: No npm packages to compile or build; renders directly in any modern browser.

---

## 🚀 Quick Local Preview

You don't need any server or dependencies to run the app locally:

1. Simply double-click `index.html` in your file explorer to open it in your browser.
2. Or use any static file server:
   ```bash
   # Python
   python -m http.server 8080

   # Or npx
   npx serve .
   ```
   Open `http://localhost:8080` in your browser.

---

## 📦 Step 1: Push to GitHub

Initialize the repository and push to your GitHub account:

```bash
# 1. Initialize Git repository
git init

# 2. Stage all files
git add .

# 3. Commit
git commit -m "Initial commit: CineVerse movie ticket booking app"

# 4. Set branch to main
git branch -M main

# 5. Link your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/cineverse-booking-app.git

# 6. Push
git push -u origin main
```

---

## 🔴 Step 2: Deploy to OpenShift

Because this application uses an **unprivileged NGINX image (`nginxinc/nginx-unprivileged:alpine`)**:
- It runs as **non-root user (UID 101)**, perfectly conforming to OpenShift's default `restricted-v2` / `restricted` Security Context Constraints (SCC).
- It binds to port **`8080`** rather than privileged port 80.
- It builds in seconds with zero build-time memory overhead.

### Method A: OpenShift CLI (`oc`) — Recommended & Fastest

Run the following commands in your OpenShift project:

```bash
# 1. Create the application directly from your GitHub repository
oc new-app https://github.com/<YOUR-GITHUB-USERNAME>/cineverse-booking-app.git --name=cineverse

# 2. Monitor the build logs
oc logs -f bc/cineverse

# 3. Expose the service to create a public HTTPS route
oc expose svc/cineverse

# 4. Get your live public application URL!
oc get route cineverse
```

### Method B: OpenShift Web Console (UI)

1. Open your **OpenShift Web Console** and switch to the **Developer** perspective.
2. Click **+Add** ➔ **Import from Git**.
3. In **Git Repo URL**, paste your GitHub repository URL:
   `https://github.com/<YOUR-GITHUB-USERNAME>/cineverse-booking-app.git`
4. Under **Build strategy**, OpenShift will automatically detect the **Dockerfile**.
5. Set Target Port to `8080`.
6. Ensure **Create a route to the Application** is checked.
7. Click **Create**. OpenShift will automatically build the container image and expose your live URL.

### Method C: Pre-configured YAML Manifests

If you prefer deploying via declarative Kubernetes/OpenShift YAML:

```bash
oc apply -f openshift/deployment.yaml
```

---

## 📁 Repository Structure

```
cineverse-booking-app/
├── index.html               # Main UI structure with Tailwind & Lucide CDN
├── style.css                # Cinematic styling, 3D screen, and seat animations
├── app.js                   # Catalog data, seat selection & checkout logic
├── Dockerfile               # Non-root unprivileged NGINX (Port 8080)
├── .dockerignore            # Build exclusion rules
├── .gitignore               # Git exclusion rules
├── openshift/
│   └── deployment.yaml      # Declarative OpenShift Deployment, Service & Route
└── README.md                # Documentation & deployment guide
```

---

## 🛡️ OpenShift Security Compliance

| Requirement | Implementation | Status |
|---|---|:---:|
| Non-Root User | Runs as unprivileged UID `101` (`nginxinc/nginx-unprivileged`) | ✅ Compliant |
| Non-Privileged Port | Binds to port `8080` (avoids privileged `<1024` ports) | ✅ Compliant |
| Security Context Constraint | Compatible with default `restricted` & `restricted-v2` SCC | ✅ Compliant |
| Minimal Image Size | Alpine base image (~22MB total size) | ✅ Fast Startup |
