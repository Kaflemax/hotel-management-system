from django.http import HttpResponse

FRONTEND_DEV_URL = "http://localhost:5173"


def home(request):
    """Django has no React UI at /. Point developers to the Vite app."""
    return HttpResponse(
        f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="2;url={FRONTEND_DEV_URL}/login" />
  <title>Hospital Management System</title>
  <style>
    body {{ font-family: system-ui, sans-serif; max-width: 32rem; margin: 3rem auto; padding: 0 1rem; }}
    a {{ color: #1E88E5; }}
    code {{ background: #f1f5f9; padding: 2px 6px; border-radius: 6px; }}
  </style>
</head>
<body>
  <h1>Hospital Management System</h1>
  <p>This port (<code>8000</code>) is the <strong>Django API</strong>, not the React admin UI.</p>
  <p>Open the web app here:</p>
  <p><a href="{FRONTEND_DEV_URL}/login">{FRONTEND_DEV_URL}/login</a></p>
  <p class="muted">If that link fails, start the UI: <code>cd frontend && npm run dev</code></p>
  <p>Redirecting in 2 seconds…</p>
</body>
</html>""",
        content_type="text/html; charset=utf-8",
    )
