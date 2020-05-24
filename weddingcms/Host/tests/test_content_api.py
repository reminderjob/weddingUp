from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient
from core.models import Host, SiteContent
from Host.serializers import ContentPublicSerializer
from django.utils.dateparse import parse_datetime
from datetime import datetime

CONTENT_PUBLIC_URL = reverse('host:sitecontent-list')
CONTENT_PRIVATE_URL = reverse('host:private_content-list')


class PublicHostApiTests(TestCase):
    """Test the public available content API"""

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
        self.test_date = parse_datetime(
            "2020-05-21T15:51")
        self.content = SiteContent.objects.create(
            the_host=self.host,
            venue_name="One Farrer Park Hotel",
            the_date=self.test_date
        )

    def test_get_host_content(self):
        """Test calling api to get public content for website display"""
        cred2 = {
            'email': 'test@londonappdev.com',
            'password': 'pa$$word',
            'username': 'John'
        }
        user2 = get_user_model().objects.create_user(**cred2)
        host2 = Host.objects.create(
            name="Joe", BudgetAmount=16.6, user=user2)
        content2 = SiteContent.objects.create(
            the_host=host2,
            venue_name="One New Hotel",
            the_date=self.test_date
        )
        res = self.client.get(CONTENT_PUBLIC_URL, {
                              'the_host': self.host.id})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        serializer1 = ContentPublicSerializer(self.content)
        serializer2 = ContentPublicSerializer(content2)
        self.assertIn(serializer1.data, res.data)
        self.assertNotIn(serializer2.data, res.data)

    def test_login_required_upload(self):
        """Test authentication is required to update/create content"""
        payload = {
            "the_host": self.host.id,
            "venue_name": "One New Hotel",
            "the_date": "2020-05-21T15:51"
        }
        res = self.client.post(CONTENT_PRIVATE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateHostApiTests(TestCase):
    """Test the public available content API"""

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
        self.test_date = parse_datetime(
            "2020-05-21T15:51")
        self.client.force_authenticate(user=self.user)

    def test_create_content(self):
        """Test able to create content for webpage"""
        payload = {
            "name": "John",
            "the_host": self.host.id,
            "venue_name": "One New Hotel",
            "the_date": "2020-05-21T15:51"
        }
        res = self.client.post(CONTENT_PRIVATE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = SiteContent.objects.filter(
            the_host=payload['the_host']
        ).exists()
        self.assertTrue(exists)
        result = self.client.get(CONTENT_PUBLIC_URL, {
            'the_host': self.host.id})
        self.assertEqual(result.status_code, status.HTTP_200_OK)
        the_content = SiteContent.objects.get(the_host=payload['the_host'])
        serializer = ContentPublicSerializer(the_content)
        self.assertIn(serializer.data, result.data)

    def test_update_content(self):
        """Test able to update content for webpage"""
        the_content = SiteContent.objects.create(
            the_host=self.host,
            venue_name="One Farrer Park Hotel",
            the_date=self.test_date
        )
        payload = {
            "name": "John",
            "the_host": self.host.id,
            "venue_name": "One New Hotel",
            "the_date": "2020-05-21T15:51"
        }
        res = self.client.patch(
            CONTENT_PRIVATE_URL + "{}/".format(the_content.id),
            payload)
        the_content.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(the_content.venue_name, payload['venue_name'])
        self.assertEqual(
            datetime.strftime(the_content.the_date,
                              '%Y-%m-%dT%H:%M'), payload['the_date'])

    def test_update_content_wrong_host_id(self):
        """Test able to update content for webpage"""
        the_content = SiteContent.objects.create(
            the_host=self.host,
            venue_name="One Farrer Park Hotel",
            the_date=self.test_date
        )
        payload = {
            "name": "John",
            "the_host": '2222',
            "venue_name": "One New Hotel",
            "the_date": "2020-05-21T15:51"
        }
        res = self.client.patch(CONTENT_PRIVATE_URL +
                                "{}/".format(the_content.id), payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        the_content.refresh_from_db()
        self.assertNotEqual(the_content.venue_name, payload['venue_name'])
        self.assertNotEqual(the_content.the_date, payload['the_date'])
