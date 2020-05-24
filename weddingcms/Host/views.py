from rest_framework import viewsets, mixins, permissions
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
    http_method_names = ['get']

    def get_queryset(self):
        """Return objects for the current host_id only"""
        the_host = self.request.query_params.get('the_host')
        queryset = self.queryset
        if (the_host):
            queryset = queryset.filter(the_host=the_host)
        return queryset.order_by('-the_host')


class ContentPrivateViewSet(viewsets.GenericViewSet,
                            mixins.UpdateModelMixin,
                            mixins.CreateModelMixin):
    """ Viewset for Guest after submit """
    serializer_class = serializers.ContentPrivateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SiteContent.objects.all()
    http_method_names = ['post', 'put', 'patch']
