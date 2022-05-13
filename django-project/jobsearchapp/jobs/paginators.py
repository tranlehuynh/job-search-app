from rest_framework import pagination


class JobPaginator(pagination.PageNumberPagination):
    page_size = 4


class UserPaginator(pagination.PageNumberPagination):
    page_size = 10
