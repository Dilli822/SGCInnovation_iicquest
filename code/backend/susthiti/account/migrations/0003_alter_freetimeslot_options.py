# Generated by Django 4.2.13 on 2024-10-04 05:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_freetimeslot_expired'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='freetimeslot',
            options={'ordering': ['-start_time']},
        ),
    ]
