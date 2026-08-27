from django.urls import include, path

urlpatterns = [
    path("patients/", include("api.v1.patients.urls")),
    path("doctors/", include("api.v1.doctors.urls")),
    path("appointments/", include("api.v1.appointments.urls")),
    path("dashboard/", include("api.v1.dashboard.urls")),
    path("reports/", include("api.v1.reports.urls")),
    path("doctor/", include("api.v1.doctor.urls")),
    path("patient/", include("api.v1.patient.urls")),
    path("laboratory/", include("api.v1.laboratory.urls")),
    path("lab-orders/", include("api.v1.lab_orders.urls")),
]

