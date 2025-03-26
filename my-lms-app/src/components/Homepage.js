import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import logo from "../images/logo.jpg";
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"
import CoursesPage from './CoursesPage.js';
import LoginForm from './LoginForm.js';
import courses from '../data/courses.js';
import testimonials from '../data/testimonials.js';

function Homepage(){
    return (
        <div>
            <Header />
            <MainSection />
            <Footer />
        </div>
    );
}

function Header(){
    let flexItem = {
        width:"33%",
        padding:"25px",
        margin:"25px"
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"row",
            width:"100%"
        }}>
            <img src={logo} alt="LMS Logo" style={{height:"150px", widht:"150px"}}/>
            <div style={flexItem}>
                <a href="/Login">Login Page</a>
            </div>
            <div style={flexItem}>
                <a href="/Courses">Courses Page</a>
            </div>
        </div>
    );
}

function MainSection(){

    let randomCourses = []
    while (randomCourses.length != 3){
        let courseNum = Math.floor(Math.random()*9);

        let canAdd = true;
        for (let i = 0; i < randomCourses.length; i++)
            if (courses[courseNum] == randomCourses[i]){
                canAdd = false;
                break;
            }
        if (canAdd){
            randomCourses.push(courses[courseNum]);
        }  
    }

    let randomTestimonials = [];
    while (randomTestimonials.length != 2){
        let test = Math.floor(Math.random()*4);

        let canAdd = true;
        for (let i = 0; i < randomTestimonials.length; i++)
            if (testimonials[test] == randomTestimonials[i]){
                canAdd = false;
                break;
            }
        if (canAdd){
            randomTestimonials.push(testimonials[test]);
        }
    } 

    let courseTable = randomCourses.map((course) =>{
        return (
            <td style={{width:"33%"}}>
                <img src={(course.image == "images/course1.jpg") ? course1 : course2} style={{width:"100%"}}/>
                <p>{course.name}</p>
                <p>{course.instructor}</p>
                <p>{course.description}</p>
                <p>{course.duration}</p>
            </td>
        );
    });


    let testimonalRow = randomTestimonials.map((testimonial) =>{
        return (
            <td style={{width:"33%"}}>
                <p>{testimonial.courseName}</p>
                <p>{testimonial.studentName}</p>
                <p>{testimonial.review}</p>
                <p>{testimonial.rating}</p>
            </td>
        );
    });
    
    return (
        <div>
            <h2>About LMS</h2>
            <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
            <p class="features">Key Features:</p>
            <ul id="index_list">
                <li>Enroll in courses</li>
                <li>Attempt quizzes</li>
                <li>View leaderboards</li>
            </ul>

            <h3>Featured Courses</h3>
            <table>
                <tr>
                    {courseTable}
                </tr>
            </table>
            <hr></hr>
            <h3>Course Reviews</h3>
            <table>
                <tr>
                    {testimonalRow}
                </tr>
            </table>

        </div>
    );
}

function Footer(){
    return (
        <div>

        </div>
    );
}


export default Homepage;