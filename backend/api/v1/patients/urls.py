from django.urls import path

from api.v1.patients.views import PatientListView

urlpatterns = [
    path("", PatientListView.as_view(), name="patient-list"),
]
