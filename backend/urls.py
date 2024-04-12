from django.urls import path, include
from .views import UserProfileView, ChatView, MessageView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)

urlpatterns = [
    path('userprofile/<str:id>', UserProfileView.as_view()),
    path('userprofile/', UserProfileView.as_view()),

    path('chat/<str:id>', ChatView.as_view()),
    path('chat/', ChatView.as_view()),

    path('message/<str:id>', MessageView.as_view()),
    path('message/', MessageView.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]