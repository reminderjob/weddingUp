from rest_framework import viewsets, mixins
from Host import serializers
from core.models import Host


class HostViewSet(viewsets.GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.HostSerializer
    queryset = Host.objects.all()
    http_method_names = ['post']
