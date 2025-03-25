import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import logo from "../images/logo.jpg";
import CoursesPage from './CoursesPage.js';
import LoginForm from './LoginForm.js'

function Homepage(){
    return (
        <div>
            <Header />
            <MainSection />
            <Footer />
        </div>
    );
}

function Header(){
    let flexitem = {
        
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"row"
        }}>
            <img src={logo} alt="LMS Logo" style={{height:"150px", widht:"150px"}}/>
            <div>
                <a href="Login">Login Page</a>
            </div>
            <div>
                <a href="Courses">Courses Page</a>
            </div>
        </div>
    );
}

function MainSection(){
    return (
        <div>

        </div>
    );
}

function Footer(){
    return (
        <div>

        </div>
    );
}


export default Homepage;