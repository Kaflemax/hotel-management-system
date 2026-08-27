from django.urls import path

from api.v1.lab_orders.views import LabOrderDetailView, LabOrderListCreateView

urlpatterns = [
    path("", LabOrderListCreateView.as_view(), name="lab-orders"),
    path("<str:order_id>/", LabOrderDetailView.as_view(), name="lab-order-detail"),
]
