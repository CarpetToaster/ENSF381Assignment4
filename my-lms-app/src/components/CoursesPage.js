import React from 'react';
import courses from '../data/courses.js';
import Header from "./Header.js"
import Footer from "./Footer.js";
import {useState} from 'react';
import CourseCatalog from './CourseCatalog.js';
import EnrollmentList from './EnrollmentList.js'



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

export default CoursesPage;