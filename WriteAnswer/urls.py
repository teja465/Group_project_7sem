
from django.contrib import admin
from django.urls import path, include
from . import views

#  This urls arent included in project
urlpatterns = [
    path('Ask_question/', views.askQuestion),


]
