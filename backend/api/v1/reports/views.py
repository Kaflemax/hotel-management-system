from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class ReportListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reports = [
            {
                "id": "1",
                "title": "Monthly patient admissions",
                "type": "Operations",
                "generatedAt": "2026-06-01",
                "status": "Ready",
                "size": "2.4 MB",
            },
            {
                "id": "2",
                "title": "Doctor utilization summary",
                "type": "HR",
                "generatedAt": "2026-05-28",
                "status": "Ready",
                "size": "1.1 MB",
            },
            {
                "id": "3",
                "title": "Critical cases audit",
                "type": "Clinical",
                "generatedAt": "2026-05-25",
                "status": "Ready",
                "size": "890 KB",
            },
            {
                "id": "4",
                "title": "Appointment no-show analysis",
                "type": "Operations",
                "generatedAt": "2026-06-02",
                "status": "Processing",
                "size": "—",
            },
            {
                "id": "5",
                "title": "Department revenue forecast",
                "type": "Finance",
                "generatedAt": "2026-05-20",
                "status": "Ready",
                "size": "3.2 MB",
            },
        ]
        summary = {
            "totalReports": len(reports),
            "readyCount": sum(1 for r in reports if r["status"] == "Ready"),
            "processingCount": sum(1 for r in reports if r["status"] == "Processing"),
            "downloadsThisMonth": 47,
        }
        return Response({"results": reports, "count": len(reports), "summary": summary})
