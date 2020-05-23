from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Guest import views

router = DefaultRouter()
router.register('submit', views.GuestViewSet)

app_name = 'guest'

urlpatterns = [
    path('', include(router.urls))
]
