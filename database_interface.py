import os
import pyrebase
from config import config

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def test_post():
	db.child("todo").child("todoex").push("YEAH")
	todo = db.child("todo").get()
	return todo.val()


# Function to add data to database
def add_data():
	return "To do"


# Function to remove data from database
def remove_data():
	return "To do"

# Function to retrieve data from database
def retrieve():
	return "To do"