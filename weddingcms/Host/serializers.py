from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.models import Host


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user object"""
    class Meta:
        model = get_user_model()
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}


class HostSerializer(serializers.ModelSerializer):
    """Serializer for host object"""
    user = UserSerializer()

    class Meta:
        model = Host
        fields = ('id', 'user', 'BudgetAmount')
        read_only_Fields = ('id',)

    def create(self, validated_data):
        """Create a new host with user"""
        user_data = validated_data.pop('user')
        user = get_user_model().objects.create_user(**user_data)
        BudgetAmount = validated_data.pop('BudgetAmount')
        name = user.username
        the_host = Host.objects.create(
            user=user, name=name, BudgetAmount=BudgetAmount)
        return the_host
