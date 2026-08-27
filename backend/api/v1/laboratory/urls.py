from django.urls import path

from api.v1.laboratory.views import LaboratoryDashboardView

urlpatterns = [
    path("dashboard/", LaboratoryDashboardView.as_view(), name="laboratory-dashboard"),
]
