# 🚀 Hostinger Deployment via GitHub

This repository is fully configured for seamless, automated deployment to **Hostinger Web Hosting** via GitHub.

---

## 📁 Files Included for Hostinger Deployment

| File / Directory | Description | Location in Hostinger (`public_html`) |
|---|---|---|
| `index.html`, `<page>.html`, `404.html` | Prerendered HTML for every page (built by `tools/prerender.js`) | Root |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Crawl files (sitemap and llms.txt are generated from `src/seo/site.js`) | Root |
| `assets/` | Compiled JavaScript & CSS bundles | `assets/` |
| `.htaccess` | 301s (www → apex, `/index.html` → `/`), clean URLs for known pages, real 404s | Root |
| `contact-handler.php` | Backend PHP script for contact form submissions | Root |
| `.github/workflows/deploy-to-hostinger.yml` | GitHub Actions workflow for automatic builds | `.github/workflows/` |

---

## 🛠️ Step 1: Push to GitHub

Your git remote has already been updated to:
`https://github.com/sharathindya/stellar-ai-website.git`

### 1️⃣ Make sure the repository exists on GitHub
If you haven't created the repository on GitHub yet:
1. Go to [https://github.com/new](https://github.com/new).
2. Repository name: `stellar-ai-website`
3. Click **Create repository** (Do NOT add README or .gitignore).

### 2️⃣ Log in & Push from Terminal
Run in your Terminal:

```bash
gh auth login
```
*(Follow the brief on-screen prompt to authenticate GitHub).*

Then push both branches:
```bash
git push -u origin main
git push origin deploy
```

---

## 🌐 Step 2: Deploy to Hostinger via GitHub

1. Log into your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Websites** -> Click **Manage** next to your domain.
3. In the left sidebar or search bar, open **Advanced** -> **Git**.
4. Fill in the **Create a New Repository** form:
   - **Repository URL**: `https://github.com/sharathindya/stellar-ai-website.git`
   - **Branch**: `deploy`
   - **Install Directory**: `public_html`
5. Click **Create**.
6. Click **Deploy** to instantly launch your website live!

---

## 🔄 Automatic Deployment (CI/CD)

Whenever you push new changes to the `main` branch, the GitHub Action workflow (`.github/workflows/deploy-to-hostinger.yml`) will automatically:
1. Build your Vite React application (`npm run build`)
2. Push the updated built files directly to the `deploy` branch.
3. Hostinger will instantly refresh your live site!

---
✅ **Status**: Repository linked to Hostinger and GitHub Actions active.


---

## 🔎 SEO setup (how pages are built)

- **Page list:** `apps/web/src/seo/site.js` holds every page's path, title, description and Open Graph image. Add a page there, add its `<Route>` in `src/App.jsx`, and add its slug to the route lists in `public/.htaccess`.
- **Prerendering:** `npm run build` builds the client, then an SSR bundle (`src/entry-server.jsx`), then `tools/prerender.js` writes one HTML file per page plus `404.html` and `sitemap.xml`. The browser hydrates the prerendered HTML.
- **Images:** favicons and the 1200×630 Open Graph images in `public/og/` are made by `npm run images --prefix apps/web` (needs Python + Pillow). Re-run it after adding a page or changing a heading.
- **Canonical host:** `https://stellaragents.in`. Canonicals are hard-coded; `www` is 301-redirected to it.
