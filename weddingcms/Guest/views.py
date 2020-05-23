from rest_framework import viewsets, mixins
from Guest import serializers
from core.models import Guest
from django.contrib.auth import get_user_model


class GuestViewSet(viewsets.GenericViewSet,
                   mixins.ListModelMixin,
                   mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.GuestSerializer
    queryset = Guest.objects.all()
    http_method_names = ['post']

    def perform_create(self, serializer):
        """Create a new object"""
        user = get_user_model().objects.get(id=self.request.data['user'])
        serializer.save(user=user)
