from rest_framework.views import APIView
from .models import UserProfile
from .serializers import (UserProfileSerializer, MyTokenObtainPairSerializer)
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
import sys
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        print(request.dat)
        return Response(UserProfileSerializer(UserProfile.objects.all().first(), context={'request': request}).data)
        # assume getting friends
        if id == None:
            try:
                current_user = UserProfile.objects.get(user=self.request.user)
                return Response(UserProfileSerializer(current_user.friends, many=True, context={'list_view': True }))
            except:
                return Response({'error': 'Unable to Retrieve Friends'})

        else:
            try:
                user_profile = UserProfile.objects.get(id=id)
                serializer = UserProfileSerializer(user_profile)
                return Response(serializer.data)
            
            except UserProfile.DoesNotExist:
                print('hello', file=sys.stderr)
                return Response({'error': 'User Profile Does Not Exist'})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer