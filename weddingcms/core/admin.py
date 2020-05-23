from django.contrib import admin
from core import models

# Register your models here.
admin.site.site_title = "WeddingUp"
admin.site.site_header = "WeddingUp"
admin.site.index_title = "WeddingUp"

admin.site.register(models.Host)
admin.site.register(models.Guest)
admin.site.register(models.SiteContent)
admin.site.register(models.Expense)
