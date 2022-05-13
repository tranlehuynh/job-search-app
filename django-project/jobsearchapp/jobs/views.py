from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from django.conf import settings

from .models import Category, Job, User, Comment, Rating, Company, JobCategory, CVOnline, Action, CompanyView
from .serializers import (
    CategorySerializer, JobSerializer, UserSerializer,
    CommentSerializer, CreateCommentSerializer,
    JobCategorySerializer, CompanySerializer,
    CVSerializer, RatingSerializer,
    ActionSerializer, CompanyViewSerializer
)
from .paginators import JobPaginator, UserPaginator
from drf_yasg.utils import swagger_auto_schema
from .perms import CommentOwnerPerms
from django.db.models import F


class CategoryViewset(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(name__icontains=kw)

        return q


class JobCategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = JobCategory.objects.filter()
    serializer_class = JobCategorySerializer

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(nameicontains=kw)

        return q


class CompanyViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Company.objects.filter(active=True)
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.action in ['take_action', 'rate']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(company_nameicontains=kw)

        return q

    @action(methods=['post'], detail=True, url_path='like')
    def take_action(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except IndexError | ValueError as ex:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            action = Action.objects.create(type=action_type,
                                           user=request.user, company=self.get_object())

            return Response(ActionSerializer(action).data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rate(self, request, pk):
        try:
            rating = int(request.data['rating'])
        except IndexError | ValueError as ex:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Rating.objects.create(rate=rating,
                                      user=request.user, company=self.get_object())

            return Response(RatingSerializer(r).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='views')
    def count_view(self, request, pk):
        v, created = CompanyView.objects.get_or_create(company=self.get_object())
        v.views = F('views') + 1
        v.save()

        v.refresh_from_db()

        return Response(CompanyViewSerializer(v).data, status=status.HTTP_200_OK)


class CVViewSet(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = CVOnline.objects.filter(active=True)
    serializer_class = CVSerializer


class JobViewSet(viewsets.ViewSet, generics.UpdateAPIView, generics.RetrieveAPIView,
                 generics.ListAPIView, generics.DestroyAPIView):
    queryset = Job.objects.filter(active=True)
    serializer_class = JobSerializer
    pagination_class = JobPaginator

    def get_permissions(self):
        if self.action == 'add_comment':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def create(self, request):
        category = Category.objects.get(pk=int(request.data.get('category_id')))
        salary = request.data.get('salary')
        image = request.data.get('image')
        description = request.data.get('description')
        category_job = JobCategory.objects.get(pk=request.data.get('job_category'))
        company = Company.objects.get(pk=request.data.get('company'))
        job_name = request.data.get('job_name')
        job = Job.objects.create(company=company, job_name=job_name, job_category=category_job,
                                 category=category, salary=salary, image=image, description=description)

        return Response(data=JobSerializer(job, context={"request": request}).data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        job = self.queryset
        category_id = self.request.query_params('category_id')
        company_id = self.request.query_params('company_id')

        if category_id:
            job = job.filter(category_id=category_id)

        if company_id:
            job = job.filter(company_id=company_id)

        return job

    def get_queryset(self):
        queryset = self.queryset

        kw = self.request.query_params.get("kw")
        if kw:
            queryset = queryset.filter(job_name__icontains=kw)

        category_id = self.request.query_params.get("category_id")
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset

    @action(methods=['post'], detail=True, url_path="add-comment")
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.objects.create(content=content, job=self.get_object(), user=request.user)

            return Response(CommentSerializer(c).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ViewSet, generics.UpdateAPIView, generics.DestroyAPIView, generics.ListAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CreateCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'destroy']:
            return [CommentOwnerPerms()]

        return [permissions.IsAuthenticated()]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().user:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().user:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.RetrieveAPIView,
                  generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = UserPaginator

    @action(methods=['post'], detail=True, url_name='cv', url_path='cv')
    def add_cv(self, request, pk):
        cv_path = request.data.get('cv')
        if cv_path:
            cv = CVOnline.objects.create(cv=cv_path, user_id=self.get_object())

            return Response(data=CVSerializer(cv, context={"request": request}).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @add_cv.mapping.patch
    def patch_cv(self, request, pk):
        cv_path = request.data.get('cv')
        cv_update = CVOnline.objects.filter(user_id=self.get_object()).first()
        if cv_path and cv_update:
            cv_update.cv = cv_path
            cv_update.save()

            return Response(CVSerializer(cv_update, context={'request': request}).data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path="current-user", detail=False)
    def current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class Oauth2(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
