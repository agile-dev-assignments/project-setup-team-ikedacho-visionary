import React from 'react';
import './Loginform.css'
import { Route } from 'react-router-dom'


const Login = (props) => {

    const login_button = e => {
        alert("Successfully Logged in!")
        }

        
    return (
        <section class="section sign-in">  
            <div className = "align-center">
        <form action="">
        <input type="text" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <button onClick = {login_button}>Sign In</button>
        </form> 
        </div>
            </section>

    );
}

export default Login;

