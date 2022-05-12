from rest_framework import serializers
from .models import Category, Job, User, Company, JobCategory, Comment, CVOnline


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
        fields = ['company_name']


class JobTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['name']


class JobSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    company = JobNameSerializer()
    job_category = JobTypeSerializer()

    # like = serializers.SerializerMethodField()
    # rating = serializers.SerializerMethodField()
    #
    # def get_like(self, job_name):
    #     request = self.context.get('request')
    #     if request:
    #         return job_name.like.set.filter(user=request.user, active=True).exists()
    #
    # def get_rating(self, job_name):
    #     request = self.context.get('request')
    #     if request:
    #         r = job_name.rating_set.filter(user=request.user).first()
    #         if r:
    #             return r.rate

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Job
        fields = ['id', 'job_name', 'job_category', 'company', 'salary', 'created_date', 'image', 'category',
                  'description']


class CVSerializer(serializers.ModelSerializer):
    cv = serializers.SerializerMethodField(source='cv')

    class Meta:
        model = CVOnline
        fields = '__all__'

    def get_cv(self, obj):
        request = self.context['request']
        if obj.cv and not obj.cv.name.startswith("/static"):
            path = '/static/%s' % obj.cv.name

            return request.build_absolute_uri(path)


class CVExtraSerializer(serializers.ModelSerializer):
    cv = serializers.SerializerMethodField(source='cv')

    class Meta:
        model = CVOnline
        fields = ['id', 'cv']

    def get_cv(self, obj):
        request = self.context['request']
        if obj.cv and not obj.cv.name.startswith("/static"):
            path = '/static/%s' % obj.cv.name

            return request.build_absolute_uri(path)


class UserSerializer(serializers.ModelSerializer):
    avatar_path = serializers.SerializerMethodField(source='avatar')
    cv = CVExtraSerializer(required=False)

    def get_avatar_path(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'role',
                  'username', 'password', 'email',
                  'avatar', 'avatar_path', 'cv']
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
        fields = ['content', 'user', 'created_date']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date']

# class ActionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Action
#         fields = ['id', 'type', 'created_date']


# class RatingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Rating
#         fields = ['id', 'rate', 'created_date']
