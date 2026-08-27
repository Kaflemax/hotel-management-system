from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.v1.lab_orders import store


class LabOrderListCreateView(APIView):
    """List lab orders (filter by patient_id, ordered_by, status) or create a new order."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = store.list_orders(
            patient_id=request.query_params.get("patient_id") or None,
            ordered_by=request.query_params.get("ordered_by") or None,
            status=request.query_params.get("status") or None,
            exclude_completed=request.query_params.get("exclude_completed") == "true",
        )
        return Response({"results": orders, "count": len(orders)})

    def post(self, request):
        required = ("patientId", "patientName", "testName", "orderedBy")
        missing = [f for f in required if not request.data.get(f)]
        if missing:
            return Response(
                {"detail": f"Missing fields: {', '.join(missing)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        order = store.create_order(request.data)
        return Response(order, status=status.HTTP_201_CREATED)


class LabOrderDetailView(APIView):
    """Get or update a single lab order (status, results)."""

    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = store.get_order(order_id)
        if not order:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(order)

    def patch(self, request, order_id):
        allowed = {
            "status",
            "resultSummary",
            "resultDetails",
            "completedBy",
            "completedAt",
            "priority",
        }
        payload = {k: request.data[k] for k in allowed if k in request.data}
        if not payload:
            return Response(
                {"detail": "No valid fields to update"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        order = store.update_order(order_id, payload)
        if not order:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(order)
