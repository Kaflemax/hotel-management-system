"""
JWT token views with optional open-access mode (any username/password for local demo).
"""
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

DOCTOR_PROFILES = {
    "doctor": {"display_name": "Dr Sathya", "specialty": "General Medicine"},
    "drpriya": {"display_name": "Dr Priya", "specialty": "Cardiology"},
    "drsree": {"display_name": "Dr Sree", "specialty": "Neurology"},
    "drkeerthana": {"display_name": "Dr Keerthana", "specialty": "Dentistry"},
}

PATIENT_PROFILES = {
    "patient": {"display_name": "Rajesh M", "patient_id": "38917"},
    "rajesh": {"display_name": "Rajesh M", "patient_id": "38917"},
    "anitha": {"display_name": "Anitha Devi", "patient_id": "51204"},
    "jeevanth": {"display_name": "Jeevanth Ram", "patient_id": "44785"},
}

LAB_PROFILES = {
    "lab": {"display_name": "Lab Tech Priya", "department": "Central Laboratory"},
    "laboratory": {"display_name": "Lab Tech Priya", "department": "Central Laboratory"},
    "labtech": {"display_name": "Lab Tech Arun", "department": "Central Laboratory"},
    "pathology": {"display_name": "Pathologist Meera", "department": "Pathology"},
}


def resolve_role(username: str, portal: str | None) -> str:
    name = username.lower().strip()
    if portal in ("admin", "doctor", "patient", "laboratory"):
        return portal
    if name in ("admin", "jeo", "superuser"):
        return "admin"
    if name.startswith("dr") or name == "doctor":
        return "doctor"
    if name.startswith("patient") or name in PATIENT_PROFILES:
        return "patient"
    if name.startswith("lab") or name in ("laboratory", "pathology", "labtech"):
        return "laboratory"
    return "patient"


def resolve_doctor_profile(username: str) -> dict:
    key = username.lower().replace(" ", "")
    return DOCTOR_PROFILES.get(
        key,
        {
            "display_name": f"Dr {username.strip().title()}",
            "specialty": "General Medicine",
        },
    )


def resolve_patient_profile(username: str) -> dict:
    key = username.lower().replace(" ", "")
    return PATIENT_PROFILES.get(
        key,
        {
            "display_name": username.strip().title(),
            "patient_id": "P-" + key[:6].upper() if key else "P-000000",
        },
    )


def resolve_lab_profile(username: str) -> dict:
    key = username.lower().replace(" ", "")
    return LAB_PROFILES.get(
        key,
        {
            "display_name": username.strip().title(),
            "department": "Central Laboratory",
        },
    )


class FlexibleTokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = (request.data.get("username") or "guest").strip() or "guest"
        portal = request.data.get("portal")

        if getattr(settings, "OPEN_ACCESS_AUTH", True):
            user, _ = User.objects.get_or_create(
                username=username,
                defaults={"email": f"{username}@open-access.local"},
            )
            refresh = RefreshToken.for_user(user)
            role = resolve_role(username, portal)
            payload = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": role,
                "username": username,
            }
            if role == "doctor":
                profile = resolve_doctor_profile(username)
                payload["display_name"] = profile["display_name"]
                payload["specialty"] = profile["specialty"]
            elif role == "patient":
                profile = resolve_patient_profile(username)
                payload["display_name"] = profile["display_name"]
                payload["patient_id"] = profile["patient_id"]
            elif role == "laboratory":
                profile = resolve_lab_profile(username)
                payload["display_name"] = profile["display_name"]
                payload["department"] = profile["department"]
            else:
                payload["display_name"] = "Admin"
            return Response(payload)

        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        data["role"] = resolve_role(username, portal)
        data["username"] = username
        return Response(data, status=status.HTTP_200_OK)
