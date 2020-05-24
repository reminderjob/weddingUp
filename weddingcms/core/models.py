from django.db import models
from django.contrib.auth import get_user_model
import uuid

# Create your models here.


class Host(models.Model):
    name = models.CharField(max_length=255)
    BudgetAmount = models.FloatField()
    expenses = models.ManyToManyField('Expense', blank=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    objects = models.Manager()

    def __str__(self):
        return self.name


class SiteContent(models.Model):
    name = models.CharField(max_length=255)
    venue_name = models.CharField(max_length=255)
    schedule_reception = models.TextField(blank=True)
    schedule_meal = models.TextField(blank=True)
    directions_car = models.TextField(blank=True)
    directions_taxi = models.TextField(blank=True)
    the_date = models.DateTimeField('wedding_date')
    the_host = models.ForeignKey(Host, on_delete=models.CASCADE)
    objects = models.Manager()

    def __str__(self):
        return self.name


class Expense(models.Model):
    the_host = models.ForeignKey(Host, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    amount = models.FloatField()
    remarks = models.TextField()
    objects = models.Manager()

    def __str__(self):
        return self.name


class Guest(models.Model):
    the_host = models.ForeignKey(Host, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    guest_email = models.EmailField()
    is_coming = models.BooleanField(default=False)
    angbao = models.FloatField(blank=True)
    objects = models.Manager()

    def __str__(self):
        return self.name
