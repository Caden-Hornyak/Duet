from rest_framework.views import APIView
from .models import (UserProfile, Chat)
from .serializers import (UserProfileListSerializer, UserProfileSingleSerializer, ChatSerializer)
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
                try:
                    user = self.request.user
                    user_profile = UserProfile.objects.get(user=user)
                    serializer = UserProfileSingleSerializer(user_profile, context=context)
                    serializer.data['username'] = user.username
                except Exception as e:
                    print(e, file=sys.stderr)
                return Response(serializer.data)
            else:
                user_profile = UserProfile.objects.get(id=id)
                serializer = UserProfileSingleSerializer(user_profile, context=context)
                return Response(serializer.data)
        except:
            return Response({ 'error': 'Unable to retrieve user profile(s)'})


class ChatView(APIView):
    permission_classes = [IsAuthenticated]
    serializer = ChatSerializer

    def get(self, request, id=None):
        try:
            if not id:
                user = self.request.user
                user_profile = UserProfile.objects.get(user=user)
                recent_chats = user_profile.chats[:10]
                serializer = self.serializer(recent_chats, many=True)
                return Response(serializer.data)
            else:
                chat = Chat.objects.get(id=id)
                serializer = self.serializer(chat)
                return Response(serializer.data)
        except:
            return Response({'error': 'Unable to retrieve chat(s)'})
            
