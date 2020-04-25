import os
import pyrebase
from flask import Flask, render_template, make_response, request
from config import config

firebase = pyrebase.initialize_app(config)
db = firebase.database()

app = Flask(__name__)

def test_post():
	db.child("todo").push("Here is one entry")
	todo = db.child("todo").get()
	return todo.val()