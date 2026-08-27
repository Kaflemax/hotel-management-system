from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class DoctorDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctor = request.query_params.get("doctor", "Dr Sathya")
        data = {
            "doctorName": doctor,
            "stats": {
                "myPatients": 12,
                "appointmentsToday": 8,
                "pendingPrescriptions": 5,
                "messagesUnread": 3,
            },
            "patients": [
                {
                    "id": "1",
                    "name": "Rajesh M",
                    "patientId": "38917",
                    "age": 32,
                    "gender": "Male",
                    "roomNumber": "102",
                    "consultingDoctor": doctor,
                    "condition": "Heavy fever",
                    "status": "Recovering",
                },
                {
                    "id": "2",
                    "name": "Anitha Devi",
                    "patientId": "51204",
                    "age": 42,
                    "gender": "Female",
                    "roomNumber": "205",
                    "consultingDoctor": doctor,
                    "condition": "Diabetes follow-up",
                    "status": "Stable",
                },
                {
                    "id": "3",
                    "name": "Vijay Kumar",
                    "patientId": "45862",
                    "age": 29,
                    "gender": "Male",
                    "roomNumber": "304",
                    "consultingDoctor": "Dr Priya",
                    "condition": "High BP",
                    "status": "Critical",
                },
            ],
            "prescriptions": [
                {
                    "id": "1",
                    "patientName": "Rajesh M",
                    "medicine": "Paracetamol 500mg — 3x daily, 5 days",
                    "doctor": doctor,
                },
                {
                    "id": "2",
                    "patientName": "Anitha Devi",
                    "medicine": "Metformin 500mg — 2x daily",
                    "doctor": doctor,
                },
            ],
            "vitals": {
                "patientName": "Rajesh",
                "age": 32,
                "summary": "Heavy fever — patient reports headache and fatigue",
                "heartRate": 80,
                "glucose": 100,
                "temperature": 38.5,
            },
            "messages": [
                {"id": "1", "from": "House keeping", "preview": "Room 102 cleaned and ready", "time": "10m ago"},
                {"id": "2", "from": "Floor manager", "preview": "Visitor pass approved for 205", "time": "1h ago"},
                {"id": "3", "from": "Lab", "preview": "Blood work results uploaded", "time": "2h ago"},
            ],
        }
        return Response(data)
