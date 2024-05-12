from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import UserViewset

urlpatterns = [
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/',UserViewset.as_view({'post':'create'}),name='user_create'),
    path('', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]