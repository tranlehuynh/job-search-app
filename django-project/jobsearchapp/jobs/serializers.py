from rest_framework import serializers
from .models import Category, Job, JobDetail, Tag, User, Comment, Company, JobCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class JobNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name']


class JobTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['id', 'name']


class JobSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    company = JobNameSerializer()
    job_category = JobTypeSerializer()

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        depth = 1
        model = Job
        fields = ['id', 'job_name', 'job_category', 'company', 'salary', 'created_date', 'image', 'category_id',
                  'description']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class JobDetailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    tags = TagSerializer(many=True)

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = JobDetail
        fields = ['id', 'job_name', 'created_date', 'updated_date', 'job_id', 'image', 'content', 'tags']


class WorkDetailSerializer(JobDetailSerializer):
    class Meta:
        model = JobDetail
        fields = JobDetailSerializer.Meta.fields + ['content']


class AuthWorkDetailSerializer(WorkDetailSerializer):
    like = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_like(self, job_name):
        request = self.context.get('request')
        if request:
            return job_name.like.set.filter(user=request.user, active=True).exists()

    def get_rating(self, job_name):
        request = self.context.get('request')
        if request:
            r = job_name.rating_set.filter(user=request.user).first()
            if r:
                return r.rate

    class Meta:
        model = JobDetail
        fields = WorkDetailSerializer.Meta.fields + ['like', 'rating']


class UserSerializer(serializers.ModelSerializer):
    avatar_path = serializers.SerializerMethodField(source='avatar')

    def get_avatar_path(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'role',
                  'username', 'password', 'email',
                  'avatar', 'avatar_path']
        extra_kwargs = {
            'password': {
                'write_only': True
            },
            'avatar_path': {
                'read_only': True
            },
            'avatar': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user


class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'user', 'jobdetail', 'created_date']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        exclude = ['active']

# class ActionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Action
#         fields = ['id', 'type', 'created_date']


# class RatingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Rating
#         fields = ['id', 'rate', 'created_date']
