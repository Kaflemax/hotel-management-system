from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.v1.lab_orders import store


class LaboratoryDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        technician = request.query_params.get("technician", "Lab Tech Priya")
        orders = store.list_orders()
        active = [o for o in orders if o.get("status") != "Completed"]
        data = {
            "technicianName": technician,
            "department": "Central Laboratory",
            "stats": store.compute_stats(orders),
            "testOrders": active,
            "completedReports": store.completed_reports(orders)[:10],
            "messages": [
                {
                    "id": "1",
                    "from": "Dr Sathya",
                    "preview": "New blood test orders appear automatically when doctors request them.",
                    "time": "Just now",
                },
            ],
        }
        return Response(data)
