import React from 'react'
import logo from "../images/logo.jpg";
import "./styles.css";

function Header(){
    return (
        <header>
            <img src={logo} alt="LMS Logo"/>
            <nav>
                <a href = "Home">Home</a>
            </nav>
            <nav>
                <a href="Login">Login Page</a>
            </nav>
            <nav>
                <a href="Courses">Courses Page</a>
            </nav>
            <div></div>
        </header>
    );
}

export default Header;