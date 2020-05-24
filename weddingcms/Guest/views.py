from rest_framework import viewsets, mixins
from Guest import serializers
from core.models import Guest, Host


class GuestViewSet(viewsets.GenericViewSet,
                   mixins.ListModelMixin,
                   mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.GuestSerializer
    queryset = Guest.objects.all()
    http_method_names = ['post']

    def perform_create(self, serializer):
        """Create a new Guest object"""
        user_exists = Host.objects.filter(
            id=self.request.data['the_host']).exists()
        if (user_exists):
            user = Host.objects.get(id=self.request.data['the_host'])
            serializer.save(the_host=user)
