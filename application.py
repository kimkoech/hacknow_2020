
# import modules
from flask import Flask, jsonify, request, render_template

# import local modules
#import database_interface as DB

#confession = DB.get_confession

# instatiate flask
app = Flask(__name__)


# handling post and get requests
@app.route('/index', methods=["GET", "POST"])
def index():
    if request.method == 'GET':
        print("Index page")
    # this message will be displayed
        return jsonify({"Page": "Index page"})
    else:
        return 'POST request received'

# rending a HTLM page . NOTE: the HTML files are in the template folder


@app.route('/')
def viewHTLM():
    return render_template('page2.html')

# send a message from the url bar and rendering a page


@app.route('/<message>')
def sendToHTLM(message=None):
    return render_template('page.html', input_message=message)


# getting form data eg login form
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        # get username ad password
        username = request.form['uname']
        password = request.form['psw']
        return 'message received successfully' + username + password
    else:
        # was GET or the credentials were invalid
        return render_template('login.html')


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
        # was GET or the credentials were invalid
        return render_template('new_post.html')


app.run(host='0.0.0.0', port=8090)
