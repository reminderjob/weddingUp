from django.db import models
from django.contrib.auth import get_user_model
from tinymce.models import HTMLField

# Create your models here.


class Host(models.Model):
    name = models.CharField(max_length=255)
    BudgetAmount = models.FloatField()
    expenses = models.ManyToManyField('Expense')
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    objects = models.Manager()

    def __str__(self):
        return self.name


class SiteContent(models.Model):
    name = models.CharField(max_length=255)
    Description = models.TextField('description')
    the_date = models.DateTimeField('wedding_date')
    Directions = HTMLField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    objects = models.Manager()

    def __str__(self):
        return self.name


class Expense(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    amount = models.FloatField()
    remarks = models.TextField()
    objects = models.Manager()


class Guest(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    guest_email = models.EmailField()
    is_coming = models.BooleanField(default=False)
    angbao = models.FloatField(blank=True)
    objects = models.Manager()

    def __str__(self):
        return self.name
