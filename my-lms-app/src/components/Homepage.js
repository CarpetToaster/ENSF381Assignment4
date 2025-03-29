import React from 'react'
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"
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

    // Not using useEffect for random courses as homepage b) doesn't ask for it.
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

    let courseTable = randomCourses.map((course) =>{
        return (
            <td class="tile" id="e">
                <img src={(course.image == "images/course1.jpg") ? course1 : course2}/>
                <h4>{course.name}</h4>
                <p>{course.instructor}</p>
                <p>{course.description}</p>
                <p>{course.duration}</p>
            </td>
        );
    });


    const [testimonialRow, setTestimonialRow] = useState([]);
    
    // using useEffect as homepage c) asks for it 
    useEffect(() => {
        let stars = "★☆";
        let randomTestimonials = [];

        while (randomTestimonials.length != 2){
            let test = Math.floor(Math.random()*4);
    
            let canAdd = true;
            for (let i = 0; i < randomTestimonials.length; i++){
                if (testimonials[test] == randomTestimonials[i]){
                    canAdd = false;
                    break;
                }
            }
            if (canAdd){
                randomTestimonials.push(testimonials[test]);
            }
        } 

        setTestimonialRow(randomTestimonials.map((testimonial) =>{
            let i = 0;
            let rating = "";
            for (i; i < testimonial.rating; i++){
                rating += stars[0];
            }
            for (i; i < 5; i++){
                rating += stars[1];
            }

            return (
                <td class="tile" id='p'>
                    <h3>{testimonial.courseName}</h3>
                    <p>{testimonial.studentName}</p>
                    <p>{testimonial.review}</p>
                    <p>{rating}</p>
                </td>
            );
        })
    )}, []); /* <- Only changing on initial render to avoid infinte 
                re-renders, still technically shows 2 on each re-render!*/ 
    


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

            <h3 style={{margin:"15px"}}>Featured Courses</h3>
            <hr></hr>
            <div class="courseViewTables">
                <table>
                    <tr>
                        {courseTable}
                    </tr>
                </table>
            </div>

            <h3 style={{margin:"15px"}}>Course Reviews</h3>
            <hr></hr>
            <div class="courseViewTable" style={{margin:"15px"}}>
                <table>
                    <tr>
                        {testimonialRow}
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Homepage;