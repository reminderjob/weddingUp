from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Host import views

router = DefaultRouter()
router.register('create', views.HostViewSet)
router.register('public_content', views.ContentPublicViewSet)
router.register('private_content', views.ContentPrivateViewSet,
                basename='private_content')

app_name = 'host'

urlpatterns = [
    path('', include(router.urls))
]
