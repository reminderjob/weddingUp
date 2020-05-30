from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient
from core.models import Host
from Host.serializers import HostSerializer


HOST_CREATE_URL = reverse('host:host-list')
HOST_PRIVATE_RETRIEVE_URL = reverse('host:find_host-list')


class PublicHostApiTests(TestCase):
    """Test the public available Host API"""

    def setUp(self):
        self.client = APIClient()
        creds = {
            'email': 'test@londonappdev.com',
            'password': 'pa$$word',
            'username': 'Joe'
        }
        self.user = get_user_model().objects.create_user(**creds)
        self.host = Host.objects.create(
            name="Joe", BudgetAmount=16.6, user=self.user)

    def test_host_create_success(self):
        """Test that create host successful"""

        payload = {
            "user": {
                "username": "john",
                "password": "password",
            },
            "BudgetAmount": 10.5
        }
        res = self.client.post(HOST_CREATE_URL, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        the_user = get_user_model().objects.get(
            username=payload['user']['username'])
        self.assertTrue(the_user.check_password(payload['user']["password"]))
        self.assertNotIn('password', res.data)
        host_exists = Host.objects.filter(
            name=payload['user']['username']
        ).exists()
        self.assertTrue(host_exists)
    
    def test_login_required_upload(self):
        """Test authentication is required to get host data"""
        params = {
            "name": 'john',
        }
        res = self.client.get(HOST_PRIVATE_RETRIEVE_URL, params)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateHostApiTests(TestCase):
    """Test the private Host API"""

    def setUp(self):
        self.client = APIClient()
        creds = {
            'email': 'test@londonappdev.com',
            'password': 'pa$$word',
            'username': 'Joe'
        }
        self.user = get_user_model().objects.create_user(**creds)
        self.host = Host.objects.create(
            name="Joe", BudgetAmount=16.6, user=self.user)
        self.client.force_authenticate(user=self.user)

    def test_host_get_success(self):
        """Test calling api to get private content for the host"""
        params = {
            "name": 'Joe',
        }
        res = self.client.get(HOST_PRIVATE_RETRIEVE_URL, params)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        cred2 = {
            'email': 'test@londonappdev.com',
            'password': 'pa$$word',
            'username': 'John'
        }
        user2 = get_user_model().objects.create_user(**cred2)
        host2 = Host.objects.create(
            name="John", BudgetAmount=16.6, user=user2)
        serializer1 = HostSerializer(self.host)
        serializer2 = HostSerializer(host2)
        self.assertIn(serializer1.data, res.data)
        self.assertNotIn(serializer2.data, res.data)
