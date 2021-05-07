import Login from '../auxiliary/Loginform'
import './Loginpage.css'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
function Loginpage() {
    let history = useHistory()

    const goTOPreviousPath = () => {
        history.push('/prelogin')
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

            <div class='loginform'>
                <Login />
            </div>
            <NavLink id='signin' to='/Signup'>
                Don't have an account?
            </NavLink>
        </div>
    )
}

export default Loginpage
