from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='users/%Y/%m')
    role = models.IntegerField(null=False, default=1)
    # cv = models.FileField(null=True, upload_to='CV Templates/%Y/%m')


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


class CVOnline(ModelBase):
    cv = models.FileField(null=True, upload_to='CV Templates/%Y/%m')
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='cv')


class Comment(ModelBase):
    content = models.TextField()
    job = models.ForeignKey(Job, related_name='comments',
                            on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class ActionBase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'job')
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
