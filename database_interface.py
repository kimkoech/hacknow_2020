import os
import pyrebase
from config import config
import json

firebase = pyrebase.initialize_app(config)
db = firebase.database()

# Function to add data to database

# post request
def post_story(story):
	result = db.child("story").push(story)
	return result['name']
# get request
def get_stories():
	data = db.child("story").get()
	return json.dumps(data.val())
def get_story(id):
	data = db.child("story").child(id).get()
	return json.dumps(data.val())

if __name__ == '__main__':
	# add_data()
	story = {
		"name": "Dong Hur",
		"lat": 0,
		"long": 0,
		"story": "Here is a long story about my experience with coronavrius!",
		"category": "physician",
		"timestamp": "4-25-2020"
	}
	data = post_story(story)
	print(data)