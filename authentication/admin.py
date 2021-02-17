from django.contrib import admin
from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import *
models_in_admin=[MyModel,profile]
admin.site.register(models_in_admin)


# Register your models here.
