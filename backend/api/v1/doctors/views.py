from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class DoctorListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctors = [
            {
                "id": "1",
                "name": "Dr Keerthana",
                "specialty": "Dentistry",
                "department": "Dental",
                "email": "keerthana@hms.local",
                "phone": "+91 90001 10001",
                "patientsCount": 18,
                "status": "Available",
            },
            {
                "id": "2",
                "name": "Dr Sree",
                "specialty": "Neurology",
                "department": "Neurology",
                "email": "sree@hms.local",
                "phone": "+91 90001 10002",
                "patientsCount": 14,
                "status": "Available",
            },
            {
                "id": "3",
                "name": "Dr Priya",
                "specialty": "Cardiology",
                "department": "Cardiology",
                "email": "priya@hms.local",
                "phone": "+91 90001 10003",
                "patientsCount": 22,
                "status": "In Surgery",
            },
            {
                "id": "4",
                "name": "Dr Sathya",
                "specialty": "General Medicine",
                "department": "General",
                "email": "sathya@hms.local",
                "phone": "+91 90001 10004",
                "patientsCount": 31,
                "status": "Available",
            },
            {
                "id": "5",
                "name": "Dr Arun",
                "specialty": "Orthopedics",
                "department": "Orthopedics",
                "email": "arun@hms.local",
                "phone": "+91 90001 10005",
                "patientsCount": 12,
                "status": "On Leave",
            },
        ]
        return Response({"results": doctors, "count": len(doctors)})
