import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import logo from "../images/logo.jpg";
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"
import LoginForm from './LoginForm.js';
import courses from '../data/courses.js';
import testimonials from '../data/testimonials.js';
import Header from "./Header.js"
import Footer from "./Footer.js";
import {useEffect, useState} from 'react';


function CoursesPage(){
    const [enrolled, setEnrolled] = useState(courses.filter((course) => {
        return (course.id in localStorage)
    }));

    
    /*A few notes here:
        1. Dr. Abdellatif gave me and two other students explicit instruction
            That we could ignore the enrollment count, and that 
            course catalog and enrolled courses should swap around using their buttons
        
        2. To make that work, We found it was easiest to follow the advice given in 
            https://react.dev/learn/sharing-state-between-components :
            to pass the state all the way to the top so that all components re-render correctly
        
        3. It is not mentioned explicitly that we cannot pass some extra props,
            even if it says not to add styling and functionality beyond requirements,
            we are simply following what the prof instructed: Enrolling should enroll,
            and dropping should drop. You can enroll if the course is not enrolled,
            and drop if the course is enrolled.  
    */


    return (
        <div className="courses-page">
            <Header />
            <div className="content">
                <CourseCatalog enrolled={enrolled} onSetEnrolled={setEnrolled}/>
                <EnrollmentList enrolled={enrolled} onSetEnrolled={setEnrolled}/>
            </div>
            <Footer />
        </div>
    );
}

function CourseItem({course, onEnroll}){
    const [mouseIn, setMouseIn] = useState(false);


    return (
        <div>
            <div className="tile" style={{width:"80%"}} 
            onMouseEnter={() => {setMouseIn(true)}} 
            onMouseLeave={() => {setMouseIn(false)}}>
                <img src={(course.image == "images/course1.jpg") ? course1 : course2} style={{width:"100%"}}/>
                <h4>{course.name}</h4>
                <p>{course.instructor}</p>
                <p>{course.duration}</p>
                <button className="button_a" onClick={onEnroll}>Enroll</button>
                <p>{(mouseIn) ? course.description : null}</p>
            </div>
        </div>
    );
}

function EnrolledCourse({course, onDrop}){
    return (
        <div>
            <div className="tile" style={{width:"80%"}}>
                <img src={(course.image == "images/course1.jpg") ? course1 : course2} style={{width:"100%"}}/>
                <h4>{course.name}</h4>
                <p>3 Credit hours</p>
                <button className="button_d" onClick={onDrop}>Drop Course</button>
            </div>
        </div>
    );
}

function CourseCatalog({enrolled, onSetEnrolled}){
    // const [enrolled, setEnrolled] = useState(courses.filter((course) => {
    //     return !(course.id in localStorage)
    // }));


    return (
        <div>
            <h3 style={{margin:"15px"}}>Course Catalog</h3>
            <hr></hr>
            <div className="course_display" style={{display:"flex",  flexDirection:"row", flexWrap:"wrap"}}>
                {courses.map((course) => 
                    !(course.id in localStorage) ? 
                        <li key={course.id}>
                            <CourseItem course={course} onEnroll={() => {
                                localStorage.setItem(course.id, course.id);
                                onSetEnrolled(courses.filter((course) => {
                                    return !(course.id in localStorage)
                                }));
                            }}/>
                        </li>
                    : null
                )}
            </div>
        </div>
    );
}

function EnrollmentList({enrolled, onSetEnrolled}){
    // const [enrolled, setEnrolled] = useState(courses.filter((course) => {
    //     return (course.id in localStorage)
    // }));

    return (
        <div>
            <h3 style={{margin:"15px"}}>Enrolled Courses</h3>
            <hr></hr>
            <div className="course_display" style={{display:"flex",  flexDirection:"row", flexWrap:"wrap"}}>
                {courses.map((course) => 
                    (course.id in localStorage) ? 
                        <li key={course.id}>
                            <EnrolledCourse course={course} onDrop={() => {
                                localStorage.removeItem(course.id);
                                onSetEnrolled(courses.filter((course) => {
                                    return (course.id in localStorage)
                                }));
                                console.log(enrolled)
                            }}/>
                        </li>
                    : null
                )}
            </div>
        </div>
    );
}

export default CoursesPage;