from django.urls import path

from api.v1.patient.views import PatientDashboardView

urlpatterns = [
    path("dashboard/", PatientDashboardView.as_view(), name="patient-dashboard"),
]
