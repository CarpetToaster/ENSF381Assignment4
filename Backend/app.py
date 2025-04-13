from flask import Flask
import flask_cors
import json

app = Flask(__name__)


students = [ # This is an example student, probably replace at seom point?
    {
        "ID": -1,
        "Username": "example",
        "Password": "none",
        "Email": "none@nowhere.io",
        "Enrolled_Courses": ["list containing all enrolled courses."]
    }
]