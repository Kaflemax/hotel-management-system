from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.v1.lab_orders import store

PATIENT_IDS = {
    "rajesh m": "38917",
    "rajesh": "38917",
    "anitha devi": "51204",
    "anitha": "51204",
    "jeevanth ram": "44785",
    "jeevanth": "44785",
}


class PatientDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patient = request.query_params.get("patient", "Rajesh M")
        patient_id = request.query_params.get("patient_id") or PATIENT_IDS.get(
            patient.lower(), "38917"
        )
        lab_orders = store.list_orders(patient_id=patient_id)
        lab_pending = [o for o in lab_orders if o.get("status") != "Completed"]
        lab_reports = store.completed_reports(lab_orders)
        data = {
            "patientName": patient,
            "patientId": patient_id,
            "age": 32,
            "gender": "Male",
            "roomNumber": "102",
            "consultingDoctor": "Dr Sathya",
            "condition": "Heavy fever",
            "status": "Recovering",
            "stats": {
                "upcomingAppointments": 2,
                "activePrescriptions": 3,
                "unreadMessages": 2,
                "pendingBills": 1,
                "pendingLabTests": len(lab_pending),
                "labReportsReady": len(lab_reports),
            },
            "labOrders": lab_orders,
            "labReports": lab_reports,
            "appointments": [
                {
                    "id": "1",
                    "date": "2026-05-25",
                    "time": "10:30 AM",
                    "doctor": "Dr Sathya",
                    "department": "General Medicine",
                    "status": "Scheduled",
                },
                {
                    "id": "2",
                    "date": "2026-05-28",
                    "time": "2:00 PM",
                    "doctor": "Dr Priya",
                    "department": "Cardiology",
                    "status": "Scheduled",
                },
            ],
            "prescriptions": [
                {
                    "id": "1",
                    "medicine": "Paracetamol 500mg — 3x daily, 5 days",
                    "doctor": "Dr Sathya",
                    "startDate": "2026-05-20",
                },
                {
                    "id": "2",
                    "medicine": "Vitamin C — 1x daily",
                    "doctor": "Dr Sathya",
                    "startDate": "2026-05-22",
                },
            ],
            "vitals": {
                "heartRate": 80,
                "glucose": 100,
                "temperature": 37.2,
                "bloodPressure": "120/80",
                "recordedAt": "2026-05-24 08:00",
            },
            "messages": [
                {
                    "id": "1",
                    "from": "Dr Sathya",
                    "preview": "Please rest and stay hydrated. Follow-up Friday.",
                    "time": "2h ago",
                },
                {
                    "id": "2",
                    "from": "Front desk",
                    "preview": "Your appointment on May 25 is confirmed.",
                    "time": "1d ago",
                },
            ],
            "bills": [
                {
                    "id": "1",
                    "description": "Room & nursing — May 2026",
                    "amount": 12500,
                    "status": "Pending",
                    "dueDate": "2026-05-30",
                },
            ],
        }
        return Response(data)
