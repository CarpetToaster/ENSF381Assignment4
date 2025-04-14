from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
import random

app = Flask(__name__)
CORS(app)

# Always use absolute path to avoid file not found errors
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    with open(os.path.join(BASE_DIR, "testimonials.json"), encoding='utf-8') as f:
        testimonials_data = json.load(f)
except Exception as e:
    print("Failed to load testimonials.json:", e)
    testimonials_data = []

try:
    with open(os.path.join(BASE_DIR, "courses.json"), encoding='utf-8') as f:
        courses_data = json.load(f)
except Exception as e:
    print("Failed to load courses.json:", e)
    courses_data = []

students = []
student_id_counter = 1

@app.route('/api/register', methods=['POST'])
def register():
    print("🔥 REGISTER CALLED")
    global student_id_counter
    data = request.get_json()
    print("Received data:", data)

    if not data:
        return jsonify({'error': 'No data received'}), 400

    if any(s['username'] == data.get('username') for s in students):
        return jsonify({'error': 'Username already taken'}), 400

    new_student = {
        'id': student_id_counter,
        'username': data.get('username'),
        'password': data.get('password'),
        'email': data.get('email'),
        'enrolled_courses': []
    }
    students.append(new_student)
    student_id_counter += 1
    return jsonify({'message': 'User registered successfully', 'student': new_student}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Login attempt:", data)

    for student in students:
        if student['username'] == data.get('username') and student['password'] == data.get('password'):
            return jsonify({'message': 'Login successful', 'student_id': student['id']}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses_data)

@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    return jsonify(random.sample(testimonials_data, 2)) if len(testimonials_data) >= 2 else jsonify(testimonials_data)

@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    print(f"Enroll request for student {student_id}:", data)
    course = data.get('course')

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
    data = request.get_json()
    print(f"Drop request for student {student_id}:", data)
    course = data.get('course')

    for student in students:
        if student['id'] == student_id:
            if course in student['enrolled_courses']:
                student['enrolled_courses'].remove(course)
                return jsonify({'message': 'Course dropped'}), 200
            else:
                return jsonify({'error': 'Course not found in enrollment'}), 400
    return jsonify({'error': 'Student not found'}), 404

@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses'])
    return jsonify([])

if __name__ == "__main__":
    print("✅ Flask is running!")
    app.run(debug=True)