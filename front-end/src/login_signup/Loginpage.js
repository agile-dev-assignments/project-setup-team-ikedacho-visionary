import Login from '../auxiliary/Loginform'
import './Loginpage.css'
import { NavLink } from 'react-router-dom'

function Loginpage() {

    return(
    <div className="Loginpage">

    
        <div class="header__text">
        <h1>O-Zone</h1>
      <p>Sign in or create a new account.</p>
    </div>

        <div class = "loginform">
        <Login/>
        </div>
        <NavLink id="signin" to = "/Signup">Don't have an account?</NavLink>
        </div>
    )
}

export default Loginpage;