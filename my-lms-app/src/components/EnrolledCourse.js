import React from 'react';
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"

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

export default EnrolledCourse;