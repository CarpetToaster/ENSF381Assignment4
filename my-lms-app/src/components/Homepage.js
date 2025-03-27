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
import Header from "./Header.js"
import Footer from "./Footer.js";
import {useEffect, useState} from 'react';

function Homepage(){
    return (
        <div>
            <Header />
            <MainSection />
            <Footer />
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
            <td class="tile" id="e">
                <img src={(course.image == "images/course1.jpg") ? course1 : course2} style={{width:"100%"}}/>
                <p>{course.name}</p>
                <p>{course.instructor}</p>
                <p>{course.description}</p>
                <p>{course.duration}</p>
            </td>
        );
    });

    let stars = "★☆";
    let testimonalRow = randomTestimonials.map((testimonial) =>{
        return (
            <td class="tile" id='p'>
                <p>{testimonial.courseName}</p>
                <p>{testimonial.studentName}</p>
                <p>{testimonial.review}</p>
                <p>{testimonial.rating}</p>
            </td>
        );
    });
    
    return (
        <div>
            <div class="about">
                <h2>About LMS</h2>
                <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
                <p class="features">Key Features:</p>
                <ul id="index_list">
                    <li>Enroll in courses</li>
                    <li>Attempt quizzes</li>
                    <li>View leaderboards</li>
                </ul>
            </div>

            <h3>Featured Courses</h3>
            <div class="courseViewTables">
                <table>
                    <tr>
                        {courseTable}
                    </tr>
                </table>
            </div>

            <hr></hr>

            <h3>Course Reviews</h3>
            <div class="courseViewTable">
                <table>
                    <tr>
                        {testimonalRow}
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Homepage;