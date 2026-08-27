from django.urls import path

from api.v1.doctor.views import DoctorDashboardView

urlpatterns = [
    path("dashboard/", DoctorDashboardView.as_view(), name="doctor-dashboard"),
]
