import React from 'react';
import './Loginform.css'

const Signup = (props) => {

    const SignUp_button = e => {
        alert("Successfully Signed up")
        }
        
    return (
        <section class="sign-in">  
            <div className = "align-center">
        <form action="">
        <input type="text" name="name" placeholder="Name"/>
        <input type="text" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="password" name="confirm" placeholder="Confirm Password"/>
        <button onClick = {SignUp_button}>Create Account</button>
        </form> 
        </div>
            </section>

    );
}

export default Signup;

