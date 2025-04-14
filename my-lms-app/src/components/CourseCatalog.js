import React from 'react';
//import courses from '../../../Backend/courses.js';
import CourseItem from './CourseItem.js';


function CourseCatalog({courses, enrolled, onSetEnrolled}){
    const studentId = localStorage.getItem('studentId');
    console.log(studentId)

    const handleEnroll = async (course) => {
        try {
          const res = await fetch(`http://localhost:5000/enroll/${studentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ course }),
          });
    
          const result = await res.json();
    
          if (res.ok) {
            localStorage.setItem(`enrolled_${course.id}`, 'true');
    
            onSetEnrolled([...enrolled, course]);
            alert(`Enrolled in ${course.name}`);
          } else {
            alert(result.error || 'Enrollment failed.');
          }
        } catch (err) {
          alert('API error.');
        }
      };

      const availableCourses = courses.filter(
        (course) => !enrolled.some((en) => en.id === course.id)
      );


    return (
        <div>
            <h3 style={{margin:"15px"}}>Course Catalog</h3>
            <hr></hr>
            <div className="course_display" style={{display:"flex",  flexDirection:"row", flexWrap:"wrap"}}>
                {availableCourses.map((course) =>  
                        <li key={course.id}>
                            <CourseItem course={course} onEnroll={() => {
                                handleEnroll(course);
                            }}/>
                        </li>
                )}
            </div>
        </div>
    );
}

export default CourseCatalog;