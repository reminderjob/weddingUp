from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient
from core.models import Guest, Host


GUEST_URL = reverse('guest:guest-list')


class PublicGuestApiTests(TestCase):
    """Test the public available ingredient API"""

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

    def test_guest_get_invalid(self):
        """Test that get request for guest is invalid"""
        res = self.client.get(GUEST_URL)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_guest_submit_success(self):
        """Test that guest submit successful"""

        payload = {
            "the_host": self.host.id,
            "name": "john",
            "guest_email": "test@example.com",
            "is_coming": "true",
            "angbao": "10.5"
        }
        res = self.client.post(GUEST_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Guest.objects.filter(
            guest_email=payload['guest_email'],
            name=payload['name']
        ).exists()
        self.assertTrue(exists)

    def test_guest_submit_invalid(self):
        """Test that guest submit missing inputs failed"""
        payload = {'name': ''}
        res = self.client.post(GUEST_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_guest_submit_invalid_host(self):
        """Test that guest submit for wrong host failed"""
        payload = {
            "the_host": "2",
            "name": "john",
            "guest_email": "test@example.com",
            "is_coming": "true",
            "angbao": "10.5"
        }
        res = self.client.post(GUEST_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
