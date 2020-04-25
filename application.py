# import modules
from flask import Flask, jsonify, request, render_template
# import local modules
from database_interface import test_post

#confession = DB.get_confession

# instatiate flask
app = Flask(__name__)

# rending a HTLM page . NOTE: the HTML files are in the template folder
@app.route('/')
def viewHTLM():
    return render_template('page.html')

@app.route('/<message>')
def sendToHTLM(message=None):
    return render_template('story.html', input_message=message)

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
