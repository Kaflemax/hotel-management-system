# Hospital Management System (monorepo)

- **Frontend:** `frontend/` — React + Vite + Tailwind + Redux Toolkit  
- **Backend:** `backend/` — Django + DRF + SimpleJWT (port **8000**)

Billing is **not** exposed in the UI for now.

## Quick start (Django + React)

1. **API** (from `backend/`):

   ```powershell
   ..\.venv\Scripts\python.exe manage.py migrate
   ..\.venv\Scripts\python.exe manage.py runserver
   ```

   Use SQLite locally (`DJANGO_DB_ENGINE=sqlite` in `backend/.env`).

2. **Web** (from `frontend/`):

   ```powershell
   copy .env.example .env
   npm install
   npm run dev
   ```

   Set `VITE_API_BASE_URL=http://127.0.0.1:8000/api` in `frontend/.env`.

## Dev open access

When **`DJANGO_OPEN_ACCESS=true`** (default), any username/password returns JWT tokens for local demos.

Set **`DJANGO_OPEN_ACCESS=false`** in `backend/.env` to require real Django user credentials (e.g. your superuser).

See **`backend/README.md`** for API paths.
