# Generated by Django 4.2.13 on 2024-06-12 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='annonymoususer',
            name='aptitude_test_score',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='annonymoususer',
            name='dob',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='doctorprofile',
            name='rating',
            field=models.FloatField(null=True),
        ),
    ]