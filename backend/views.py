from rest_framework.views import APIView
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
import sys

# Create your views here.
class UserProfileView(APIView):
    def get(self, request, id=None):
        return Response(UserProfileSerializer(UserProfile.objects.all().first()).data)
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

