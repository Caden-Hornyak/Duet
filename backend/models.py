from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Descriptor(models.Model):
    word = models.CharField(max_length=50)

    def __str__(self):
        return self.word

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    biography = models.CharField(max_length=255)
    public_name = models.CharField(max_length=30)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='images/')
    friends = models.ManyToManyField('self', blank=True)
    description_tags = models.ForeignKey('Descriptor', null=True, blank=True, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.user)
    