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

    def test_host_str(self):
        """Test the host string representation"""
        host = models.Host.objects.create(
            user=sample_user(),
            BudgetAmount=15.5,
            name='Tim'
        )
        self.assertEqual(str(host), host.name)
