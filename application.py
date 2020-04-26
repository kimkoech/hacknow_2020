# import modules
from flask import Flask, jsonify, request, render_template, redirect, url_for
from datetime import datetime

# import local modules
import database_interface as DB
import json

# instatiate flask
app = Flask(__name__)

@app.route('/')
def home():
    data = DB.get_stories()
    return render_template('homepage.html', data=data)

# making a new post
@app.route('/new_post', methods=['POST', 'GET'])
def newPost():
    if request.method == 'POST':
        # jsonify story
        firstName = request.form['fname']
        lastName = request.form['lname']
        category = request.form['category']
        story = request.form['message']
        story_json = {"name": firstName + " " + lastName,
        "lat": 0,"long": 0,
        "story": story,
        "category": category,
        "timestamp": str(datetime.now())}
        # show post
        post_id = DB.post_story(story_json)
        data = DB.get_story(post_id)
        jsonData = json.loads(data)
        return render_template('post.html', post_data=jsonData)
    else:
        # rended new post page
        return render_template('new_post.html')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=8090)
