from django.urls import path

from api.v1.dashboard.views import DashboardSummaryView

urlpatterns = [
    path("summary/", DashboardSummaryView.as_view(), name="dashboard-summary"),
]
