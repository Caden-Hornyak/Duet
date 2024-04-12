from rest_framework.views import APIView
from .models import (UserProfile, Chat, Message)
from .serializers import (UserProfileListSerializer, UserProfileSingleSerializer, ChatSerializer, MessageSerializer)
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
            if not id:
                user = self.request.user
                user_profile = UserProfile.objects.get(user=user)
                serializer = UserProfileSingleSerializer(user_profile, context=context)
                serializer.data['username'] = user.username
                return Response(serializer.data)
            elif id == 'friends':
                user = self.request.user
                current_user = UserProfile.objects.get(user=user)
                serializer = UserProfileListSerializer(current_user.friends, many=True, context=context)
                return Response(serializer.data)
            else:
                user_profile = UserProfile.objects.get(id=id)
                serializer = UserProfileSingleSerializer(user_profile, context=context)
                return Response(serializer.data)
        except:
            return Response({ 'error': 'Unable To Retrieve User Profile(s)'})


class ChatView(APIView):
    permission_classes = [IsAuthenticated]
    serializer = ChatSerializer

    def get(self, request, id=None):
        try:
            if not id:
                user = self.request.user
                user_profile = UserProfile.objects.get(user=user)
                recent_chats = user_profile.chats.all()[:10]
                serializer = self.serializer(recent_chats, many=True)
                return Response(serializer.data)
            else:
                chat = Chat.objects.get(id=id)
                serializer = self.serializer(chat)
                return Response(serializer.data)
        except:
            return Response({'error': 'Unable To Retrieve Chat(s)'})

class MessageView(APIView):
    permission_classes = [IsAuthenticated]
    serializer = MessageSerializer

    def post(self, request):
        # try:
            data = request.data

            text = data['message']
            chat_id = data['chat']
            user_prof = UserProfile.objects.get(user=self.request.user)
            
            message = Message.objects.create(writer=user_prof, text=text)

            chat = Chat.objects.get(id=chat_id)
            chat.messages.add(message)
            chat.save()

            serializer = self.serializer(message)
            return Response(serializer.data)
        # except:
        #     return Response({'error': 'Unable To Create Messsage'})