# Generated by Django 4.0.2 on 2022-05-06 06:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0009_jobcategory_job_job_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobcategory',
            name='active',
        ),
        migrations.RemoveField(
            model_name='jobcategory',
            name='created_date',
        ),
        migrations.RemoveField(
            model_name='jobcategory',
            name='updated_date',
        ),
    ]
