from django.urls import path

from api.v1.appointments.views import AppointmentListView

urlpatterns = [
    path("", AppointmentListView.as_view(), name="appointment-list"),
]
