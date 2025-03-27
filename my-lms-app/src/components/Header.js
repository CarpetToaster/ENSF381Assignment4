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
import "./styles.css";

function Header(){
    return (
        <header>
            <img src={logo} alt="LMS Logo"/>
            <nav>
                <a href="/Login">Login Page</a>
            </nav>
            <nav>
                <a href="/Courses">Courses Page</a>
            </nav>
            <div></div>
        </header>
    );
}

export default Header;