from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from .models import Category, Job, User, Comment, JobCategory, Company, CVOnline
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path


# class JobDetailForm(forms.ModelForm):
#     content = forms.CharField(widget=CKEditorUploadingWidget)
#
#     class Meta:
#         model = JobDetail
#         fields = '__all__'


class JobAdmin(admin.ModelAdmin):
    search_fields = ['job_name', 'category']
    readonly_fields = ['image_view']

    def image_view(self, job):
        if job:
            return mark_safe(
                '<img src="/static/{url}" width="120" />' \
                    .format(url=job.image.name)
            )

    def get_urls(self):
        return [
                   path('job-stats/', self.stats_view)
               ] + super().get_urls()

    def stats_view(self, request):
        c = Job.objects.filter(active=True).count()
        stats = Job.objects.annotate(jobdetail_count=Count('my_job')).values('id', 'job_name', 'jobName_count')

        return TemplateResponse(request,
                                'admin/job-stats.html', {
                                    'count': c,
                                    'stats': stats
                                })


class CategoryAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['name', 'created_date']
    list_display = ['id', 'name', 'created_date']


class CVAdmin(admin.ModelAdmin):
    pass


class JobCategoryAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['name']
    list_display = ['id', 'name']


class CompanyAdmin(admin.ModelAdmin):
    search_fields = ['company_name']
    list_filter = ['company_name']
    list_display = ['id', 'company_name']


# Register your models here.
admin.site.register(User)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Job, JobAdmin)
admin.site.register(Comment)
admin.site.register(JobCategory, JobCategoryAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(CVOnline, CVAdmin)
