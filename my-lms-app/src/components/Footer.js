import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import logo from "../images/logo.jpg";
import course1 from "../images/course1.jpg";
import course2 from "../images/course2.jpg"
import CoursesPage from './CoursesPage.js';
import LoginForm from './LoginForm.js';
import courses from '../data/courses.js';
import testimonials from '../data/testimonials.js';
import Header from "./Header.js"




function Footer(){
    return (
        <div>
            <br></br>
            <footer>
                <p>&copy; 2025 LMS. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;