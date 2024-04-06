from rest_framework.serializers import ModelSerializer
from .models import UserProfile, Descriptor
import sys

class DescriptorSerializer(ModelSerializer):
    
    class Meta:
        model = Descriptor
        fields = ['word']

class UserProfileSerializer(ModelSerializer):
    description_tags = DescriptorSerializer()
    
    class Meta:
        model = UserProfile
        fields = '__all__'
    
    def to_representation(self, instance):
        if self.context.get('list_view', False):
            return {
                'id': instance.id,
                'public_name': instance.public_name,
                'profile_picture': instance.profile_picture,
                'description_tags': DescriptorSerializer(instance.description_tags).data
            }
        
        else:
            return super().to_representation(instance)
