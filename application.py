
# import modules
from flask import Flask, jsonify, request, render_template

# import local modules
#import database_interface as DB

#confession = DB.get_confession

# instatiate flask
app = Flask(__name__)


# handling post and get requests
@app.route('/index', methods=["GET","POST"])
def index():
	if request.method == 'GET':
		print("Index page")
        # this message will be displayed
		return jsonify({ "Page": "Index page"})
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
        

app.run(host='0.0.0.0', port= 8090)