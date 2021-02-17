from django.db import models
from ckeditor.fields import RichTextField
# Create your models here.
from markdownx.models import MarkdownxField
from django.contrib.auth.models import User

class MyModel(models.Model):
    #myfield = MarkdownxField()
    code_field=RichTextField(blank=True,null=True)

class profile(models.Model):
    user = models.OneToOneField(User, default=1,on_delete=models.CASCADE)
    #  bio email college  profession

    bio=models.CharField(max_length = 190,default='None')
    email=models.CharField(max_length = 26,default='None')
    college=models.CharField(max_length = 50,default='None')
    profession=models.TextField(default='None')

    def __str__(self):
        return self.email
