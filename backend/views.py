from rest_framework.views import APIView
from .models import (UserProfile, Chat, Message, Notification)
from .serializers import (UserProfileListSerializer, UserProfileSingleSerializer, 
                          ChatSerializer, MessageSerializer)
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

    def get(self, request, chat_id, start, end):
        try:
            if not chat_id or not start or not end:
                return Response({'error': 'Invalid Request For Messages'})
            
            chat = Chat.objects.get(id=chat_id)

            user_prof = UserProfile.objects.get(user=self.request.user)

            if user_prof not in chat.members.all():
                return Response({'error': 'Unauthorized Request for Messages'})
            else:
                messages = chat.messages.all()[start:end]
                serializer = self.serializer(messages, many=True)
                return Response(serializer.data)
        except:
            return Response({'error': 'Unable to Retrieve Messages.'})

    def post(self, request):
        try:
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
        except:
            return Response({'error': 'Unable To Create Messsage'})
        

class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    # post/creation in ChatView

    def put(self, request, type):

        data = request.data
        user_id = data['user']
        chat_id = data['chat']

        chat = Chat.objects.get(id=chat_id)
        user_prof = UserProfile.objects.get(id=user_id)

        notification = Notification.objects.get(chat=chat)

        if type == 'mark_read':
            notification.users.remove(user_prof)
            notification.save()

            return Response({ 'success': 'Notification Cleared'})
            
        elif type == 'renew':
            for curr_prof in chat.users:
                if curr_prof != user_prof and curr_prof not in notification.users:
                    notification.users.add(curr_prof)
            notification.save()

            return Response({ 'success': 'Notification Sent'})

