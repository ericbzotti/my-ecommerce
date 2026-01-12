# Déploiement sans serveur public — Vercel (frontend) + Render (backend) + Aiven (DB)

Ce dossier est un **starter** minimal (exemple) pour illustrer les fichiers typiques à avoir.
Adapte-le à ton projet existant si tu as déjà du code.

## Où déployer quoi
- **Vercel** : `frontend/` (React/Vite)  
- **Render** : `backend/` (API Express)  
- **Aiven** : service **MySQL** (schéma SQL dans `db/schema.sql`)

## Variables d'environnement (résumé)
### Frontend (Vercel)
- `VITE_API_BASE_URL` = URL publique de l'API Render (ex: `https://mon-api.onrender.com`)

### Backend (Render)
- `NODE_ENV=production`
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `DB_SSL=true` (si TLS requis)
- optionnel: `DB_CA_CERT_BASE64` (recommandé) ou `DB_SSL_INSECURE=true` (cours/dev seulement)
- `CORS_ORIGIN` = URL Vercel (ex: `https://mon-projet.vercel.app`)

## Endpoints utiles
- `GET /health` -> test rapide que l'API est en vie
- `GET /products` -> exemple simple relié à la DB

