from django.contrib import admin
from .models import (UserProfile, Descriptor, Chat, Message, Notification)
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Descriptor)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Notification)