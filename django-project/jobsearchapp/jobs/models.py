from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='users/%Y/%m')
    role = models.IntegerField(null=False, default=1)


class ModelBase(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Company(models.Model):
    company_name = models.CharField(max_length=255, null=False)
    active = models.BooleanField(default=True)
    address = models.CharField(max_length=255)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.company_name


class JobCategory(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class CVOnline(ModelBase):
    intro = RichTextField()
    from_salary = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    to_salary = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Category(ModelBase):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Job(ModelBase):
    job_name = models.CharField(max_length=255, null=False)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='jobs/%Y/%m')
    salary = models.CharField(max_length=255, null=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)
    job_category = models.ForeignKey(JobCategory, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.job_name

    class Meta:
        unique_together = ('job_name', 'category')


class JobDetail(ModelBase):
    job_name = models.CharField(max_length=255)
    content = RichTextField()
    image = models.ImageField(null=True, upload_to='jobdetails/%Y/%m')
    job = models.ForeignKey(Job,
                            related_name="jobdetails",
                            related_query_name='my_jobdetail',
                            on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')
    viewers = models.ManyToManyField(User, through='UserJobDetailView')

    def __str__(self):
        return self.job_name


class UserJobDetailView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    jobdetail = models.ForeignKey(JobDetail, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    reading_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'jobdetail')


class Comment(ModelBase):
    content = models.TextField()
    jobdetail = models.ForeignKey(JobDetail,
                                  related_name='comments',
                                  on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Tag(ModelBase):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class ActionBase(ModelBase):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    jobdetail = models.ForeignKey(JobDetail, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'jobdetail')
        abstract = True


class Like(ActionBase):
    active = models.BooleanField(default=False)


# class Action(ActionBase):
# LIKE, HEART, DISLIKE = range(3)
# ACTIONS = [
#     (LIKE, '👍'),
#     (HEART, '❤'),
#     (DISLIKE, '👎')
# ]
# type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


class Rating(ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)
