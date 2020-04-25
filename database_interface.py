import os
import pyrebase
from config import config
import json

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def test_post():
	db.child("todo").child("todoex").push("YEAH")
	todo = db.child("todo").get()
	return todo.val()


# Function to add data to database
def add_data():
	story = {
		"name": "Dong Hur",
		"lat": 0,
		"long": 0,
		"story": "Here is a long story about my experience with coronavrius!",
		"category": "physician",
		"timestamp": "4-25-2020"
	}
	db.child("story").push(story)
	return "To do"


# Function to remove data from database
def remove_data():
	return "To do"

# Function to retrieve data from database
def retrieve():
	data = db.child("story").get()
	return data

if __name__ == '__main__':
	# add_data()
	data = retrieve()
	print(json.dumps(data.val()))