from rest_framework.serializers import ModelSerializer
from .models import UserProfile, Descriptor, User
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
