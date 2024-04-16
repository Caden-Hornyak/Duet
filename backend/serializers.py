from rest_framework.serializers import ModelSerializer
from .models import (UserProfile, Descriptor, User, Chat, Message, Notification)
from rest_framework import serializers
import sys

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class DescriptorSerializer(ModelSerializer):
    
    class Meta:
        model = Descriptor
        fields = ['word']

class UserProfileListSerializer(ModelSerializer):
    
    class Meta:
        model = UserProfile
        exclude = ['user', 'friends', 'biography', 'chats']

class UserProfileSingleSerializer(ModelSerializer):
    username = serializers.SerializerMethodField()
    friends = UserProfileListSerializer(many=True)

    class Meta:
        model = UserProfile
        exclude = ['user', 'chats']
    
    def get_username(self, instance):
        try:
            user = self.context.get('request').user
            if instance.user == user:
                return user.username
            else:
                return None
        except:
            return None


class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ChatSerializer(ModelSerializer):
    messages = serializers.SerializerMethodField()
    notification = serializers.SerializerMethodField()
    members = UserProfileListSerializer(many=True)

    class Meta:
        model = Chat
        fields = '__all__'

    def get_messages(self, instance):
        try:
            recent_messages = instance.messages.all()[:20]
            serializer = MessageSerializer(recent_messages, many=True)
            return serializer.data
        except:
            return None
        
    def get_notification(self, instance):
        try:
            notification = Notification.objects.get(chat=instance)

            user = self.context.get('request').user
            user_profile = UserProfile.objects.get(user=user)

            return user_profile in notification.users
        except:
            return False

        
