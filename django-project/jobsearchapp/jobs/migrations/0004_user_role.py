# Generated by Django 4.0.2 on 2022-05-05 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_cvonline_like_userjobdetailview_job_pre_jobs_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.IntegerField(default=1),
        ),
    ]