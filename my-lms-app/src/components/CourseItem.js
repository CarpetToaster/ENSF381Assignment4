import React from 'react';
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"
import {useState} from 'react';

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
                <button className="button_a" onClick={onEnroll}>Enroll Now</button>
                <p>{(mouseIn) ? course.description : null}</p>
            </div>
        </div>
    );
}

export default CourseItem;