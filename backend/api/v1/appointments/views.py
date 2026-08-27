from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class AppointmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        appointments = [
            {
                "id": "1",
                "patientName": "Jeevanth Ram",
                "patientId": "44785",
                "doctor": "Dr Keerthana",
                "date": "2026-06-03",
                "time": "09:00",
                "type": "Follow-up",
                "status": "Scheduled",
            },
            {
                "id": "2",
                "patientName": "Vijay Kumar",
                "patientId": "45862",
                "doctor": "Dr Priya",
                "date": "2026-06-03",
                "time": "10:30",
                "type": "Consultation",
                "status": "In Progress",
            },
            {
                "id": "3",
                "patientName": "Anitha Devi",
                "patientId": "51204",
                "doctor": "Dr Keerthana",
                "date": "2026-06-03",
                "time": "11:00",
                "type": "Lab review",
                "status": "Complete",
            },
            {
                "id": "4",
                "patientName": "Rajesh M",
                "patientId": "38917",
                "doctor": "Dr Sathya",
                "date": "2026-06-03",
                "time": "14:00",
                "type": "Emergency",
                "status": "Scheduled",
            },
            {
                "id": "5",
                "patientName": "Kathirssan",
                "patientId": "32581",
                "doctor": "Dr Sree",
                "date": "2026-06-04",
                "time": "09:30",
                "type": "Consultation",
                "status": "Pending",
            },
            {
                "id": "6",
                "patientName": "Jeevanth Ram",
                "patientId": "44785",
                "doctor": "Dr Arun",
                "date": "2026-06-02",
                "time": "16:00",
                "type": "Follow-up",
                "status": "Cancelled",
            },
        ]
        return Response({"results": appointments, "count": len(appointments)})
