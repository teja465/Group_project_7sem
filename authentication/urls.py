from authentication.views import ask_question
from django.contrib import admin
from django.urls import path, include
from authentication import views
import markdown

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout_user_view),
    path('protected/', views.protected_view),
    path('markdownx/', include('markdownx.urls')),
    path('answer/', views.answer_view),
    path('ask/', views.ask_question),
    path('qns/', views.all_questions),
    path('signup/', views.signup_view)

]
