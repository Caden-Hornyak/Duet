# Generated by Django 5.0.4 on 2024-04-05 06:25

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Descriptor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('biography', models.CharField(max_length=255)),
                ('public_name', models.CharField(max_length=30)),
                ('profile_picture', models.ImageField(default='profile_pictures/default_profpic.png', upload_to='images/')),
                ('description_tags', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='backend.descriptor')),
                ('friends', models.ManyToManyField(to='backend.userprofile')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
