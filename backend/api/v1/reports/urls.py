from django.urls import path

from api.v1.reports.views import ReportListView

urlpatterns = [
    path("", ReportListView.as_view(), name="report-list"),
]
