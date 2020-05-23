from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

LOGIN_USER_URL = reverse('login')


class JWTTokenTestsPublic(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_users_no_login(self):
        """Test that users who are not login cannot access"""
        url = LOGIN_USER_URL
        res = self.client.post(url, {})
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_get_request(self):
        """Test that cannot send get request"""
        url = LOGIN_USER_URL
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class JWTTokenTestsPrivate(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username="user",
            password='password')

    def test_user_login_false(self):
        """Test User login with wrong credentials fails"""
        url = LOGIN_USER_URL
        res = self.client.post(
            url, data={"username": "ss", "password": "password"})
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        res = self.client.post(
            url, data={"username": "user", "password": "pasSword"})
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_logined(self):
        """Test User login with right credentials works"""
        url = LOGIN_USER_URL
        res = self.client.post(
            url, data={"username": "user", "password": "password"})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
