from django.http import request
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as dj_login, logout
from django.contrib.auth.decorators import login_required

from .models import *
from .forms import *
from django.contrib.auth.models import User
# Create your views here.

# @login_required
def Home_view(request):
    if request.user.is_authenticated:
        print('yes')
    else:
        print('no')
    return render(request, 'index_of_home.html')

#  redirect_field_name="http://127.0.0.1:8000/you_are_being_redirected_here_after_login"


def login(request, after_login="http://127.0.0.1:8000"):
    print(after_login, 'this is redirect url______________________________')
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            # print(form.cleaned_data)
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:

                dj_login(request, user)
                print("logged  in ", request.user, sorted(dir(request.user)))
                return HttpResponseRedirect(after_login)
            else:
                return HttpResponse("something went wrong")

        else:
            context = {'form': form}
            return render(request, 'registration/login.html', context)

    form = LoginForm()
    context = {'form': form}
    return render(request, 'registration/login.html', context)


def logout_user_view(request):
    # print('before logout', request.user)
    logout(request)
    # print('After logout', request.user)
    return HttpResponseRedirect("http://127.0.0.1:8000/");


# @login_required(login_url='http://127.0.0.1:8000/login/', redirect_field_name='http://127.0.0.1:8000/you_are_being_redirected_here_after_login')
def protected_view(request):
    if request.user.is_authenticated:
        pass
    else:
        #print('in else request.user')
        return login(request, "http://127.0.0.1:8000/protected/")
    if request.method == 'POST':
        msg = request.POST['code_field']
        # msg='<h1>Hello ravi This is H1 tag&nbsp;</h1> <p><strong>Hello ravi This is H1 tag&nbsp;</strong></p> <div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px">Hello ravi This is H1 tag&nbsp;</div> <p><span style="background-color:#16a085">Hello ravi This is H1 tag&nbsp;</span></p> <p>&nbsp;</p>'
        #print('---------------------', msg)
        md = MyForm()
        return render(request, 'protected.html', {'form': md, 'msg': msg})
    else:

        md = MyForm()
        # msg='<h1>Hello ravi This is H1 tag&nbsp;</h1> <p><strong>Hello ravi This is H1 tag&nbsp;</strong></p> <div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px">Hello ravi This is H1 tag&nbsp;</div> <p><span style="background-color:#16a085">Hello ravi This is H1 tag&nbsp;</span></p> <p>&nbsp;</p>'
        msg = ""
        return render(request, 'protected.html', {'form': md, 'msg': msg})


def answer_view(request):
    return render(request, 'answer_box.html')

def ask_question(request):

    if request.method == 'POST':
        print(request.POST)
        form = MyForm(request.POST)
        if form.is_valid():
            print('valid  form and saing')
            t = form.save(commit=False)
            # commit=False tells Django that "Don't send this to database yet.
            # I have more things I want to do with it."


            t.save() # Now you can send it to DB

            return HttpResponse('saved Question')
        else:
            print('Not valid  form')

    question_field = MyForm()
    return render(request,'ask.html',{'form':question_field})
def  all_questions(request):
    qns=MyModel.objects.all()
    return render(request,'qns.html',{'qns':qns})










#  New user craete from
def signup_view(request):

    form=signup_form()
    pform= profile_form()

    if request.method=='POST':
        user_data=request.POST
        username=user_data.get("username")
        email=user_data.get("email")
        password=user_data.get("password")
        form=User.objects.create_user(username,email,password)
        # print("form obj",form)
        print(request.POST)
        user_obj=User.objects.get(username=form)
        print("user created obj",user_obj.pk)
        user_profile=profile.objects.create(
            user=user_obj,
            bio=user_data.get("bio"),
            email=user_data.get("email"),
            profession=user_data.get("profession"),
            college=user_data.get("college")
        )
        print(user_profile)

        return HttpResponse('New user created')


    return render(request,'signup.html',{'form':form,'profile':pform})
