# import modules
from flask import Flask, jsonify, request, render_template
# import local modules
from database_interface import test_post

#confession = DB.get_confession

# instatiate flask
app = Flask(__name__)

@app.route('/')
def viewHTLM():
    return render_template('page.html')
    
# display a post
@app.route('/<post_id>')
def displayPost(post_id):
    return render_template('post.html', post_data=retrieve(post_id))

# getting form data eg a post
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
