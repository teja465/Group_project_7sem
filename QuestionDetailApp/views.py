from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
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


# Create your views here.
def question_detail_page(request, qid):
    doc = qns_ref.document(qid).get()
    if doc.to_dict():
        print(doc.to_dict())
    else:
        return HttpResponse("question not  exist in database ")

    return render(request, "QuestionDetailApp/index_qdp.html", {'qid': qid})
