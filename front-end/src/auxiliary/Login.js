import React from 'react';
import './Login.css'

const Login = (props) => {

    const login_button = e => {
        alert("Login is clicked! ")
        }
        
    return (
        <div className = "align-center">
            <p className = "Login-text">Login</p>

            <p className = "Login-enter">Username</p>
            <input className = "text-input" type = "text"/>

            <p className = "Login-enter">Password</p>
            <input className = "text-input" type = "text"/>

            <button className = "button" onClick = {login_button}>Login</button>  
        </div>
    );
}

export default Login;