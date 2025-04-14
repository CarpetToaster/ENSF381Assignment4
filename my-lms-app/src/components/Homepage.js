import React from 'react'
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"
//import courses from '../data/courses.js';
//import testimonials from '../data/testimonials.js';
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
    const [testimonialRow, setTestimonialRow] = useState([]);
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/courses')
          .then(res => res.json())
          .then(data => {
            const selected = [];
            while (selected.length < 3 && data.length > 0) {
              const rand = Math.floor(Math.random() * data.length);
              const course = data[rand];
              if (!selected.find(c => c.id === course.id)) {
                selected.push(course);
              }
            }
            setCourses(selected);
          })
          .catch(err => console.error("Failed to load courses:", err));
      }, []);

      
    


    
    
    // using useEffect as homepage c) asks for it 
    useEffect(() => {
        fetch('http://localhost:5000/testimonials')
            .then(res => res.json())
            .then(data => {
            const selected = [];
            while (selected.length < 2 && data.length > 0) {
            const rand = Math.floor(Math.random() * data.length);
            const t = data[rand];
            if (!selected.find(x => x.courseName === t.courseName && x.studentName === t.studentName)) {
                selected.push(t);
            }
        }
        const stars = "★☆";
        const rows = selected.map((testimonial, index) => {
          let rating = '';
          for (let i = 0; i < testimonial.rating; i++) rating += stars[0];
          for (let i = testimonial.rating; i < 5; i++) rating += stars[1];

            return (
                <td class="tile" id='p'>
                    <h3>{testimonial.courseName}</h3>
                    <p>{testimonial.studentName}</p>
                    <p>{testimonial.review}</p>
                    <p>{rating}</p>
                </td>
            );
        });

        setTestimonialRow(rows);
      })
      .catch(err => console.error("Failed to load testimonials:", err));
  }, []); /* <- Only changing on initial render to avoid infinte 
                re-renders, still technically shows 2 on each re-render!*/ 

        const courseTable = courses.map(course => (
            <td key={course.id} className="tile" id="e">
                <img src={course.image === "images/course1.jpg" ? course1 : course2} alt={course.name} />
                <h4>{course.name}</h4>
                <p>{course.instructor}</p>
                <p>{course.description}</p>
                <p>{course.duration}</p>
            </td>
            ));


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