from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(prefix='categories', viewset=views.CategoryViewset, basename='category')
router.register(prefix='jobs', viewset=views.JobViewSet, basename='job')
router.register(prefix='jobdetails', viewset=views.JobDetailViewSet, basename='jobdetail')
router.register(prefix='comments', viewset=views.CommentViewSet, basename='comment')
router.register(prefix='users', viewset=views.UserViewSet, basename='user')
router.register(prefix='jobcategories', viewset=views.JobCategoryViewSet, basename='jobcategory')
router.register(prefix='companies', viewset=views.CompanyViewSet, basename='company')
# router.register(prefix='jobs-parttime', viewset=views.UserViewSet, basename='jobsparttime')
# router.register(prefix='jobs-fulltime', viewset=views.UserViewSet, basename='jobsfulltime')

urlpatterns = [
    path('', include(router.urls)),
    path('my-jobs/', views.MyJobView.as_view()),
    path('my-jobs/<int:pk>/', views.MyJobDetailView.as_view()),
    path('oauth2/', views.Oauth2.as_view()),
]