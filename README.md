# RSVP Chloro Tech — Web App

Project management and chlorination design tool for water treatment engineering.

## Stack

- **Node.js** (built-in `http` module — no Express)
- **Supabase** — cloud persistence (Postgres + Storage)
- **Groq AI** — AI-assisted design document generation

## Quick Start (Local)

```bash
cp .env.example .env   # fill in your secrets
npm install
npm start              # http://localhost:8001
```

## Deploy on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect your repo — Render will detect `render.yaml` automatically.
4. Fill in the secret values when prompted:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GROQ_API_KEY`
5. Click **Apply** — your app is live at `https://rsvp-web-app.onrender.com`.

> **Note:** The free plan sleeps after 15 minutes of inactivity.  
> Upgrade to **Starter** in `render.yaml` (`plan: starter`) for always-on hosting.

## Environment Variables

Copy `.env.example` to `.env` for local development.  
All keys are documented in `.env.example` and `render.yaml`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Dashboard UI |
| GET | `/health` | Health check (used by Render) |
| GET | `/api/state` | Load app state |
| POST | `/api/state` | Save app state |
| POST | `/api/calculations` | Save calculation + upload PDFs |
| POST | `/api/project-documents` | Upload project document |
| POST | `/api/documents/get` | Copy shared document to project |
| POST | `/api/ai/generate` | Generate AI text via Groq |
| GET | `/api/status` | Server / integration status |
