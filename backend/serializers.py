from rest_framework.serializers import ModelSerializer
from .models import (UserProfile, Descriptor, User, Chat, Message)
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
        exclude = ['user', 'friends', 'biography']

class UserProfileSingleSerializer(ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        exclude = ['user']
    
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
        include = '__all__'

class ChatSerializer(ModelSerializer):
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        include = '__all__'

    def get_messages(self, instance):
        try:
            recent_messages = instance.messages[:10]
            serializer = MessageSerializer(recent_messages, many=True)
            return serializer.data
        except:
            return None
