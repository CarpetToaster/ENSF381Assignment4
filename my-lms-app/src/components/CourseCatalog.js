import React from 'react';
import courses from '../data/courses.js';
import CourseItem from './CourseItem.js';


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
                                    return (course.id in localStorage)
                                }));
                            }}/>
                        </li>
                    : null
                )}
            </div>
        </div>
    );
}

export default CourseCatalog;