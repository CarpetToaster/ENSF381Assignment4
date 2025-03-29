import React from 'react';
import courses from '../data/courses.js';
import EnrolledCourse from './EnrolledCourse.js';


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
            <h3 style={{margin:"15px"}}><b>Total Credit Hours: </b>{3*enrolled.length}</h3>
        </div>
    );
}

export default EnrollmentList;