from django import forms
from markdownx.fields import MarkdownxFormField
from django.forms import ModelForm
from .models import *
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(max_length=20, required=True)
    password = forms.CharField(widget=forms.PasswordInput(), required=True)


class MyForm(ModelForm):
    class Meta:
        model = MyModel
        exclude = []

class signup_form(forms.ModelForm):
    class Meta:
        model=User
        #fields='__all__'
        fields=['username','password']
class profile_form(forms.ModelForm):
    class Meta:
        model=profile
        fields='__all__'
