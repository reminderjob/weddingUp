from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(username='user', password='password'):
    """Create a sample user"""
    return get_user_model().objects.create_user(
        username=username, password=password)


class ModelTests(TestCase):
    def test_create_user_successful(self):
        """Test creating a new user is successful"""
        username = 'user'
        password = 'password'
        user = sample_user()
        self.assertEqual(user.username, username)
        self.assertTrue(user.check_password(password))
