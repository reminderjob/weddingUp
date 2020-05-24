from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient
from core.models import Host


HOST_URL = reverse('host:host-list')


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
        res = self.client.post(HOST_URL, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        the_user = get_user_model().objects.get(
            username=payload['user']['username'])
        self.assertTrue(the_user.check_password(payload['user']["password"]))
        self.assertNotIn('password', res.data)
        host_exists = Host.objects.filter(
            name=payload['user']['username']
        ).exists()
        self.assertTrue(host_exists)
