from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from django.conf import settings

from .models import Category, Job, JobDetail, User, Comment, Like, Rating, Tag, Company, JobCategory
from .serializers import (
    CategorySerializer, JobSerializer,
    JobDetailSerializer, UserSerializer,
    AuthWorkDetailSerializer, WorkDetailSerializer,
    CommentSerializer, CreateCommentSerializer,
    JobCategorySerializer, CompanySerializer
    # ActionSerializer, RatingSerializer
)
from .paginators import JobPaginator, UserPaginator
from drf_yasg.utils import swagger_auto_schema
from .perms import CommentOwnerPerms


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


class CompanyViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Company.objects.filter(active=True)
    serializer_class = CompanySerializer

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(company_nameicontains=kw)

        return q


class JobViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Job.objects.filter(active=True)
    serializer_class = JobSerializer
    pagination_class = JobPaginator

    def get_queryset(self):
        queryset = self.queryset

        kw = self.request.query_params.get("kw")
        if kw:
            queryset = queryset.filter(job_name__icontains=kw)

        category_id = self.request.query_params.get("category_id")
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset

    @swagger_auto_schema(
        operation_description='Get the job details of a job',
        responses={
            status.HTTP_200_OK: JobDetailSerializer()
        }
    )
    @action(methods=['get'], detail=True, url_path="jobdetails")
    def get_jobdetails(self, request, pk):
        job = self.get_object()
        jobdetails = job.jobdetails.filter(active=True)

        kw = request.query_params.get('kw')
        if kw:
            jobdetails = jobdetails.filter(job_name__icontains=kw)

        return Response(data=JobDetailSerializer(jobdetails, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class JobDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = JobDetail.objects.filter(active=True)
    serializer_class = WorkDetailSerializer

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return AuthWorkDetailSerializer

        return WorkDetailSerializer

    def get_permissions(self):
        if self.action in ['like', 'rate']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True, url_path='tags')
    def add_tag(self, request, pk):
        try:
            jobdetail = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            tags = request.data.get("tags")
            if tags is not None:
                for tag in tags:
                    t, _ = Tag.objects.get_or_create(name=tag)
                    jobdetail.tags.add(t)

                jobdetail.save()

                return Response(self.serializer_class(jobdetail).data,
                                status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description='Get the comments of a job',
        responses={
            status.HTTP_200_OK: CommentSerializer()
        }
    )
    @action(methods=['get'], url_path='comments', detail=True)
    def get_comments(self, request, pk):
        jobdetail = self.get_object()
        comments = jobdetail.comments.select_related('user').filter(active=True)

        return Response(CommentSerializer(comments, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='like')
    def like(self, request, pk):
        jobdetail = self.get_object()
        user = request.user

        l, _ = Like.objects.get_or_create(jobdetail=jobdetail, user=user)
        l.active = not l.active
        try:
            l.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=AuthWorkDetailSerializer(jobdetail, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rating(self, request, pk):
        jobdetail = self.get_object()
        user = request.user

        r, _ = Rating.objects.get_or_create(jobdetail=jobdetail, user=user)
        r.rate = request.data.get('rate', 0)
        try:
            r.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=AuthWorkDetailSerializer(jobdetail, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet, generics.CreateAPIView,
                     generics.UpdateAPIView, generics.DestroyAPIView, generics.ListAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CreateCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'destroy']:
            return [CommentOwnerPerms()]

        return [permissions.IsAuthenticated()]


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = UserPaginator

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path="current-user", detail=False)
    def current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class MyJobView(generics.ListCreateAPIView):
    lookup_field = ['job_name']
    queryset = Job.objects.filter(active=True)
    serializer_class = JobSerializer


class MyJobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.filter(active=True)
    serializer_class = JobSerializer


class Oauth2(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
