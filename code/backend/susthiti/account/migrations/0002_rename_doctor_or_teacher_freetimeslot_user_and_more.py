# Generated by Django 4.2.13 on 2024-06-13 11:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='freetimeslot',
            old_name='doctor_or_teacher',
            new_name='user',
        ),
        migrations.DeleteModel(
            name='AppointmentPlacementByUser',
        ),
    ]