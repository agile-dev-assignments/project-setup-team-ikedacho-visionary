import React, {useState} from 'react';
import './Loginform.css'
import { Route } from 'react-router-dom'
import axios from 'axios'
import { createBrowserHistory } from "history";


const Login = (props) => {
    const history = createBrowserHistory({forceRefresh:true})
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

   
    const userdata = {
        username: loginUsername,
        password: loginPassword
    }
    const login = (event) => {
        axios
        .post(
        "/login",
        {
            username: loginUsername,
            password: loginPassword,
             withCredentials: true,
        })
        .then(response => {
            if (response.data === "Successfully Authenticated") {
                console.log(response);
                history.push({
                    pathname: '/',
                    state: userdata
                })
            }
            else{
                console.log(response.data);
            }
            })
            .catch(error => {
                console.log("registration error", error);
                });
                event.preventDefault()
            };
        
        

      




        
    return (
        <section class="section sign-in">  
            <div className = "align-center">
        <form action="">
        <input type="text" name="username" placeholder="username"  onChange={(e) => setLoginUsername(e.target.value)}/>
        <input type="password" name="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}/>
        <button onClick={login.bind()}>Sign In</button>
        </form> 
        </div>
            </section>

    );
}

export default Login;

