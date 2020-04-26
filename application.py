# import modules
from flask import Flask, jsonify, request, render_template, redirect, url_for
from datetime import datetime
import requests

# import local modules
import database_interface as DB
import json

# instatiate flask
app = Flask(__name__)

@app.route('/')
def home():
    data = DB.get_stories()
    return render_template('homepage.html', data=data)

@app.route('/post/<story_id>')
def post(story_id):
    data = DB.get_story(story_id)
    jsonData = json.loads(data)
    return render_template('post.html', post_data=jsonData)

# making a new post
@app.route('/new_post', methods=['POST', 'GET'])
def newPost():
    if request.method == 'POST':
        # get user IP address and location data
        ip_add = request.environ['REMOTE_ADDR']
        get_geo_data = requests.get(url='http://ip-api.com/json/' + str(ip_add))
        location = get_geo_data.json()
        print(location)
        if (location['status'] != 'success'):
            lat = 0
            long = 0
        else:
            lat = location['lat']
            long = location['lon']

        # jsonify story
        firstName = request.form['fname']
        lastName = request.form['lname']
        category = request.form['category']
        story = request.form['message']
        story_json = {"name": firstName + " " + lastName,
        "lat": lat,"long": long,
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
