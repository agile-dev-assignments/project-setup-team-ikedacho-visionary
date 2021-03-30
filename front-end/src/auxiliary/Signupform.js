import React,{ useState }  from 'react';
import './Loginform.css'
import { createBrowserHistory } from "history";
import axios from 'axios'

const Signup = (props) => {


    const history = createBrowserHistory({forceRefresh:true})

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      });
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setState(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleSubmit = event => {
        const { username, email, password, password_confirmation } = state;

        axios
        .post(
        "/newuser", 
        {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation
            }
        
        )
        .then(response => {
        if (response.data.status === "created") {
            console.log(response.data);
            history.push({
                pathname: '/',
                state: state
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

 
    const SignUp_button = (event) => {
        event.preventDefault()
        history.push({
            pathname: '/',
            state: state
        })
        axios
        .post('/newuser', state)
        .then(() => console.log('new user Created'+state))
        .catch(err => {
          console.error(err);
        });
      };

 
        
       
    
        
    return (
        <section class="sign-in">  
            <div className = "align-center">
        <form action="" onChange={handleInputChange} onSubmit={handleSubmit} >
        <input type="text" name="username" placeholder="Name"onChange={handleInputChange}/>
        <input type="text" name="email" placeholder="Email"onChange={handleInputChange}/>
        <input type="password" name="password" placeholder="Password"onChange={handleInputChange}/>
        <input type="password" name="password_confirmation" placeholder="Confirm Password"onChange={handleInputChange}/>
        <button 
        // onClick = {SignUp_button.bind()}
        type="submit"
        >Create Account</button>
        </form> 
        </div>
            </section>

    );
}

export default Signup;

