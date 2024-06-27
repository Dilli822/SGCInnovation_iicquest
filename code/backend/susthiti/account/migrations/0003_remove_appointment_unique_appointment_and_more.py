# Generated by Django 4.2.13 on 2024-06-27 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_appointment_unique_appointment'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='appointment',
            name='unique_appointment',
        ),
        migrations.AlterUniqueTogether(
            name='freetimeslot',
            unique_together={('user', 'start_time', 'end_time')},
        ),
    ]
