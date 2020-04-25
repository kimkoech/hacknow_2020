import os
import pyrebase
from flask import render_template, make_response, request
from config import config

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def test_post():
	db.child("todo").child("todoex").push("YEAH")
	todo = db.child("todo").get()
	return todo.val()