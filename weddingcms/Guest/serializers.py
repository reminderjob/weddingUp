from rest_framework import serializers
from core.models import Guest


class GuestSerializer(serializers.ModelSerializer):
    """Serializer for tag object"""
    class Meta:
        model = Guest
        fields = ('id', 'user', 'name', 'guest_email', 'is_coming', 'angbao')
        read_only_Fields = ('id', 'user')
