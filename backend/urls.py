from django.urls import path, include
from .views import UserProfileView

urlpatterns = [
    path('userprofile/<str:id>', UserProfileView.as_view()),
    path('userprofile/', UserProfileView.as_view())
]