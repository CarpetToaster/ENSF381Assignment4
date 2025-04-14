import React from 'react';
//import courses from '../../../Backend/courses.js';
import EnrolledCourse from './EnrolledCourse.js';


function EnrollmentList({enrolled, onSetEnrolled}){
    // const [enrolled, setEnrolled] = useState(courses.filter((course) => {
    //     return (course.id in localStorage)
    // }));
    const studentId = localStorage.getItem('studentId');

    const HandleDrop = async (course) =>{
        try{
            const res = await fetch(`http://localhost:5000/api/drop/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseId: course.id })
            });

            const result = await res.json();

            if (res.ok) {
                localStorage.removeItem(`enrolled_${course.id}`);
                const updated = enrolled.filter((c) => c.id !== course.id);
                onSetEnrolled(updated);
                alert(result.message || 'Dropped course!');
            } else {
                console.error('Failed to drop course');
            }
        }
        catch(err){
            alert('API error:', err);
        }
    }



    return (
        <div>
            <h3 style={{margin:"15px"}}>Enrolled Courses</h3>
            <hr></hr>
            <div className="course_display" style={{display:"flex",  flexDirection:"row", flexWrap:"wrap"}}>
                {enrolled.map((course) => 
                    (course.id in localStorage) ? 
                        <li key={course.id}>
                            <EnrolledCourse course={course} onDrop={() => {
                                HandleDrop(course);
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