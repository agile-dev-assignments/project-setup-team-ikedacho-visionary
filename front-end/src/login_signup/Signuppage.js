import Signup from '../auxiliary/Signupform'
import './Loginpage.css'
import { NavLink } from 'react-router-dom'

function Signuppage() {
    return (
        <div className='Loginpage'>
            <div class='header__text'>
                <h1>O-Zone</h1>
                <p>Sign in or create a new account.</p>
            </div>

            <div class='Signupform'>
                <Signup />
            </div>
            <NavLink id='signin' to='/Login'>
                Already have an account?
            </NavLink>
        </div>
    )
}

export default Signuppage
