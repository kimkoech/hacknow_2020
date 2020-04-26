# import modules
from flask import Flask, jsonify, request, render_template
# import local modules
import database_interface as DB

# instatiate flask
app = Flask(__name__)

@app.route('/')
def home():
    data = DB.get_stories()
    return render_template('homepage.html', data=data)
    
# display a post
@app.route('/post/<post_id>')
def displayPost(post_id):
    return render_template('post.html', post_data=DB.get_story(post_id))

# making a new post
@app.route('/new_post', methods=['POST', 'GET'])
def newPost():
    if request.method == 'POST':
        # get username ad password
        firstName = request.form['fname']
        lastName = request.form['lname']
        posted_data = request.form['post']
        return jsonify({"First name": firstName,
                        "Last name": lastName,
                        "Post": posted_data,
                        "Status": "Posted to flask successfully"})
        
    else:
        # rended new post page
        return render_template('new_post.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8090)
