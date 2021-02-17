from firebase_admin import credentials
import firebase_admin
from firebase_admin import auth
import requests
from os import path
from django.http import request
from django.http.response import HttpResponse, Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import os
import time
from django.contrib.auth.models import User

from firebase_admin import firestore
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "E:\\React\\rprojects\\gp_jango\\WriteAnswer\\static\\firebase_config.json"


cred = credentials.Certificate(
    "E:\\React\\rprojects\\gp_jango\\WriteAnswer\\static\\firebase_config.json")
try:

    firebase_admin.initialize_app(cred)
except:
    pass

db = firestore.client()
qns_ref = db.collection('questions_collection')

"""
data = {
    u'stringExample': u'Hello, World!',
    u'booleanExample': True,
    u'numberExample': 3.14159265,
    u'dateExample': datetime.datetime.now(),
    u'arrayExample': [5, True, u'hello'],
    u'nullExample': None,
    u'objectExample': {
        u'a': 5,
        u'b': True
    }
}

db.collection(u'data').document(u'one').set(data)

"""


@csrf_exempt
def askQuestion(request):

    if request.method == 'POST':
        print(request.user.id, 'uidr')
        if request.user.is_authenticated:
            data = json.loads(request.body.decode('utf-8'))
            print('print post requestion in ask question')
            # print(dir(request.POST), 'request.post data')
            print(data)
            t = {
                'date': int(time.time() * 1000),
                'description': 'some dummy description from admin sdk',
                'question': data.get('title', ''),
                'userName': str(request.user),
                'body': data.get('body', ''),
                'user_id': request.user.id

            }
            print(t)

            qns_ref.document().set(t)

            return HttpResponse("QAdded")

        else:
            # Do something for anonymous users.
            return HttpResponse("loginRequired")

    return render(request, 'ans.html')


@csrf_exempt
def write_answer_view(request, qid):
    print(qid)
    question = qns_ref.document(qid).get().to_dict()
    print(question)
    if request.method == 'POST':

        if request.user.is_authenticated:
            data = json.loads(request.body.decode('utf-8'))
            # data[question_id,answer_text]
            question_id = data['question_id']
            print('got post request [write_answer_view]')
            # print(request.body)
            # print(request.user,request.user.id)
            user_obj = User.objects.get(id=request.user.id)
            # print(dir(user_obj))
            # print(user_obj.profile.bio)
            name = request.user
            print(dir(request.user))
            answer_from_user = {
                'answer_text': data.get('answer_text', "Answer "),
                'likes': [],
                "dislikes": [],
                "user_id": request.user.id,
                "userName": name.username,
                "desc": user_obj.profile.bio,
                "date": int(time.time() * 1000),
                'no_of_likes': 0,
                "no_of_dislikes": 0
            }
            print(answer_from_user)
            qns_ref.document(question_id).collection(
                'answersSubCollection').document().set(answer_from_user)

            return HttpResponse("AnsAdded")

        else:
            print(request.user)
            return HttpResponse("loginRequired")
    qn_id = qid
    question = qns_ref.document(qid).get(
    ).to_dict().get("question", "question not found !!!")
    print(question, 'question to be sent to jango head')
    return render(request, "Answer/answer_a_question.html", {"qn_id": qn_id, 'question': question})
