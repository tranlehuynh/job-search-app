# Generated by Django 4.0.2 on 2022-05-12 16:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_alter_cvonline_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='cvonline',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='CVOnlines', to='jobs.company'),
        ),
    ]
