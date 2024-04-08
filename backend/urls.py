from django.urls import path, include
from .views import UserProfileView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)

urlpatterns = [
    path('userprofile/<str:id>', UserProfileView.as_view()),
    path('userprofile/', UserProfileView.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]