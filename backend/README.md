# Django API

## Frontend connection

Set in `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## API paths

| Method | Path | Auth |
|--------|------|------|
| `POST` | `/api/auth/token/` | `{ "username", "password" }` → `{ "access", "refresh" }` |
| `POST` | `/api/auth/refresh/` | `{ "refresh" }` → `{ "access" }` |
| `GET` | `/api/v1/dashboard/summary/` | `Authorization: Bearer <access>` |

## Open access

When **`DJANGO_OPEN_ACCESS=true`** (default), `POST /api/auth/token/` accepts any **username** (password is ignored) and returns SimpleJWT tokens.

Set **`DJANGO_OPEN_ACCESS=false`** for normal superuser login.

## Run

```powershell
cd backend
..\.venv\Scripts\python.exe manage.py migrate
..\.venv\Scripts\python.exe manage.py runserver
```

Create a superuser (when open access is off):

```powershell
..\.venv\Scripts\python.exe manage.py createsuperuser
```
