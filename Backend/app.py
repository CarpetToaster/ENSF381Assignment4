from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)

with open("Backend/testimonials.json") as t_file: # This assumes the python file is ran in the folder containing Backend and my-lms-app
    testimonials_data = json.load(t_file)

with open("Backend/courses.json") as c_file:
    courses_data = json.load(c_file)

student_id_counter = 1

students = []

@app.route('/register', methods=['POST'])
def register():
    print("Register endpoint called")
    data = request.get_json()
    print("Received data:", data)
    global student_id_counter
    data = request.json
    username = data.get('username')

    if any(s['username'] == username for s in students):
        return jsonify({'error': 'Username already taken'}), 400

    new_student = {
        'id': student_id_counter,
        'username': username,
        'password': data.get('password'),
        'email': data.get('email'),
        'enrolled_courses': []
    }
    students.append(new_student)
    student_id_counter += 1
    return jsonify({'message': 'User registered successfully', 'student': new_student}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    for student in students:
        if student['username'] == data.get('username') and student['password'] == data.get('password'):
            return jsonify({'message': 'Login successful', 'student_id': student['id']}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    return jsonify(random.sample(testimonials_data, 2))  

@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
        course = request.json.get('course')
        for student in students:
            if student['id'] == student_id:
                if course not in student['enrolled_courses']:
                    student['enrolled_courses'].append(course)
                    return jsonify({'message': 'Course enrolled'}), 200
                else:
                    return jsonify({'error': 'Already enrolled'}), 400
        return jsonify({'error': 'Student not found'}), 404

@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    course = request.json.get('course')
    for student in students:
        if student['id'] == student_id:
            if course in student['enrolled_courses']:
                student['enrolled_courses'].remove(course)
                return jsonify({'message': 'Course dropped'}), 200
            else:
                return jsonify({'error': 'Course not found in enrollment'}), 400
    return jsonify({'error': 'Student not found'}), 404

@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses_data)

@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses'])
    return jsonify([])

if __name__ == "__main__":
    app.run(debug=True)
