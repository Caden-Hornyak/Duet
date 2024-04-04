from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    biography = models.CharField(max_length=255)
    public_name = models.CharField(max_length=30)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='images/', default='images/default_profpic.png')

    def __str__(self):
        return str(self.user)
    
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ManyToManyField('UserProfile')
    likes = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    images = models.ManyToManyField('Image', blank=True)
    videos = models.ManyToManyField('Video', blank=True)
    description = models.CharField(max_length=255)
    comments = models.ManyToManyField('Comment', blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=255)
    comments = models.ManyToManyField('self', blank=True, symmetrical=False)
    date_created = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.text
    
class File(models.Model):
    file = models.FileField(upload_to='files/')
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['order']
    