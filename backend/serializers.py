from rest_framework.serializers import ModelSerializer
from .models import UserProfile, Descriptor, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import sys

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class DescriptorSerializer(ModelSerializer):
    
    class Meta:
        model = Descriptor
        fields = ['word']

class UserProfileSerializer(ModelSerializer):
    description_tags = DescriptorSerializer()
    
    class Meta:
        model = UserProfile
        exclude = ['user']
    
    def to_representation(self, instance):
        if self.context.get('list_view', False):
            ret = {
                'id': instance.id,
                'public_name': instance.public_name,
                'profile_picture': instance.profile_picture,
                'description_tags': DescriptorSerializer(instance.description_tags).data,
            }
            if self.context.get('request').user.username == instance.user.username:
                ret['username'] = instance.user.username
            return ret
        
        else:
            return super().to_representation(instance)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token