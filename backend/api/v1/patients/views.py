from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class PatientListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patients = [
            {
                "id": "1",
                "name": "Jeevanth Ram",
                "patientId": "44785",
                "age": 36,
                "gender": "Male",
                "roomNumber": "101",
                "consultingDoctor": "Dr Keerthana",
                "condition": "Root canal",
                "status": "Recovering",
                "phone": "+91 98765 43210",
                "admittedOn": "2026-05-18",
            },
            {
                "id": "2",
                "name": "Kathirssan",
                "patientId": "32581",
                "age": 35,
                "gender": "Male",
                "roomNumber": "103",
                "consultingDoctor": "Dr Sree",
                "condition": "Bell palsy",
                "status": "Stable",
                "phone": "+91 98765 11223",
                "admittedOn": "2026-05-20",
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
                "phone": "+91 98765 99887",
                "admittedOn": "2026-05-22",
            },
            {
                "id": "4",
                "name": "Anitha Devi",
                "patientId": "51204",
                "age": 42,
                "gender": "Female",
                "roomNumber": "205",
                "consultingDoctor": "Dr Keerthana",
                "condition": "Diabetes follow-up",
                "status": "Stable",
                "phone": "+91 98765 55443",
                "admittedOn": "2026-05-21",
            },
            {
                "id": "5",
                "name": "Rajesh M",
                "patientId": "38917",
                "age": 32,
                "gender": "Male",
                "roomNumber": "102",
                "consultingDoctor": "Dr Sathya",
                "condition": "Heavy fever",
                "status": "Recovering",
                "phone": "+91 98765 77665",
                "admittedOn": "2026-05-23",
            },
        ]
        return Response({"results": patients, "count": len(patients)})
