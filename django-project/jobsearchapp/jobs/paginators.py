from rest_framework import pagination


class JobPaginator(pagination.PageNumberPagination):
    page_size = 1


class UserPaginator(pagination.PageNumberPagination):
    page_size = 2