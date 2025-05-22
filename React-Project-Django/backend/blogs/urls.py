from django.urls import path
from .views import BlogList, BlogDetail

urlpatterns = [
    path('', BlogList.as_view(), name='blog_list'),
    # path('blogs/<int:pk>/', BlogDetail.as_view(), name='blog_detail'),
    path('<int:pk>/', BlogDetail.as_view(), name='blog_detail'),
]
