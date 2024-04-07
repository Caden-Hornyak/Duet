from django.urls import path, include
from .views import UserProfileView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('userprofile/<str:id>', UserProfileView.as_view()),
    path('userprofile/', UserProfileView.as_view()),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]