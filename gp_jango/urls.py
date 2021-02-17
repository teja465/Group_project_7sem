"""gp_jango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import WriteAnswer
from authentication import views as auth_view
from WriteAnswer import views as WriteAnswer_views
from QuestionDetailApp import urls as qdp_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', auth_view.Home_view),
    path('', include("authentication.urls")),
    path('ask', WriteAnswer_views.askQuestion),
    path('write_answer/<str:qid>', WriteAnswer_views.write_answer_view),
    path('', include("QuestionDetailApp.urls"))




]
