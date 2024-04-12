# Generated by Django 5.0.4 on 2024-04-12 00:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_message_writer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='writer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend.userprofile'),
        ),
    ]
