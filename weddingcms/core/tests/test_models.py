from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(username='user', password='password'):
    """Create a sample user"""
    return get_user_model().objects.create_user(
        username=username, password=password)


def sample_host(name="Joe", BudgetAmount=16.6):
    """Create a sample Host"""
    user = sample_user()
    return models.Host.objects.create(name=name,
                                      BudgetAmount=BudgetAmount,
                                      user=user)


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

    def test_guest_str(self):
        """Test the Guest string representation"""
        guest = models.Guest.objects.create(
            the_host=sample_host(),
            name="john",
            guest_email="test@example.com",
            is_coming=True,
            angbao=10.5
        )
        self.assertEqual(str(guest), guest.name)
