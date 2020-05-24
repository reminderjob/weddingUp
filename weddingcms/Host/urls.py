from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Host import views

router = DefaultRouter()
router.register('create', views.HostViewSet)

app_name = 'host'

urlpatterns = [
    path('', include(router.urls))
]
