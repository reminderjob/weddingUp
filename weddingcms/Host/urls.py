from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Host import views

router = DefaultRouter()
router.register('create', views.HostPublicCreateViewSet)
router.register('public_content', views.ContentPublicViewSet)
router.register('private_content', views.ContentPrivateViewSet,
                basename='private_content')
router.register('find_host', views.HostPrivateViewSet,basename='find_host')             

app_name = 'host'

urlpatterns = [
    path('', include(router.urls))
]
