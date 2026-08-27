from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from api.v1.auth.views import FlexibleTokenObtainPairView

urlpatterns = [
    path("token/", FlexibleTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

