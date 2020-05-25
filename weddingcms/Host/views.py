from rest_framework import viewsets, mixins, permissions
from django_filters.rest_framework import DjangoFilterBackend
from Host import serializers
from core.models import Host, SiteContent


class HostViewSet(viewsets.GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.HostSerializer
    queryset = Host.objects.all()
    http_method_names = ['post']


class ContentPublicViewSet(viewsets.GenericViewSet,
                           mixins.ListModelMixin,
                           mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.ContentPublicSerializer
    queryset = SiteContent.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['the_host']
    http_method_names = ['get']

    def get_queryset(self):
        """Retrieve the siteContent with params the_host"""
        the_host = self.request.query_params.get('the_host')
        if the_host is None:
            self.queryset = SiteContent.objects.none()
        return self.queryset


class ContentPrivateViewSet(viewsets.GenericViewSet,
                            mixins.UpdateModelMixin,
                            mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.ContentPrivateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SiteContent.objects.all()
    http_method_names = ['post', 'put', 'patch']
