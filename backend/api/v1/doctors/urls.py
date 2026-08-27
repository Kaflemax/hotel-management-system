from django.urls import path

from api.v1.doctors.views import DoctorListView

urlpatterns = [
    path("", DoctorListView.as_view(), name="doctor-list"),
]
