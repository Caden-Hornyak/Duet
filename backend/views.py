from rest_framework.views import APIView
from .models import UserProfile
from .serializers import (UserProfileListSerializer, UserProfileSingleSerializer)
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
import sys
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        try:
            context = {'request': request}
            # assume getting friends
            if id == None:
                user = self.request.user
                current_user = UserProfile.objects.get(user=user)
                serializer = UserProfileListSerializer(current_user.friends, many=True, context=context)
                return Response(serializer.data)
            elif id == 'self':
                user = self.request.user
                user_profile = UserProfile.objects.get(user=user)
                serializer = UserProfileSingleSerializer(user_profile, context=context)
                serializer.data['username'] = user.username
                return Response(serializer.data)
            else:
                user_profile = UserProfile.objects.get(id=id)
                serializer = UserProfileSingleSerializer(user_profile, context=context)
                return Response(serializer.data)
        except:
            return Response({ 'error': 'Unable to retrieve user profile(s)'})
            
