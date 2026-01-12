# Guide rapide (classe) — Vercel + Render + Aiven

## 1) Aiven (MySQL)
1. Crée un service MySQL
2. Récupère: host, port, user, password, database
3. (Optionnel) récupère le CA cert -> convertis en base64 pour `DB_CA_CERT_BASE64`

## 2) Render (backend)
1. New Web Service (GitHub)
2. Root directory: `backend`
3. Build: `npm ci`
4. Start: `npm start`
5. Env vars à ajouter dans Render (dashboard):
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `DB_SSL=true` (si requis)
   - `DB_CA_CERT_BASE64=...` (recommandé) ou `DB_SSL_INSECURE=true` (cours/dev)
   - `CORS_ORIGIN=https://<ton-projet>.vercel.app`
6. Test: `https://<render-url>/health`

## 3) Vercel (frontend)
1. Import project (GitHub)
2. Root directory: `frontend`
3. Env var:
   - `VITE_API_BASE_URL=https://<render-url>`
4. Deploy
5. Test: ouvrir le site, vérifier `/health` et la liste de produits.

## Note
Si tu as un monorepo, Vercel et Render peuvent pointer vers des sous-dossiers différents.
