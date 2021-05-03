import Signup from '../auxiliary/Signupform'
import './Loginpage.css'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'

function Signuppage() {

    let history = useHistory()

    const goTOPreviousPath = () => {
        history.goBack()
    }
    return (
        <div className='Loginpage'>
            <section id='header'>
            <Link onClick={goTOPreviousPath}>
                <h1 id='back'>Back</h1>
            </Link>
            </section>
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
