import React, { useState } from 'react'
import './Loginform.css'
import { createBrowserHistory } from 'history'
import axios from 'axios'

const Signup = (props) => {
    const history = createBrowserHistory({ forceRefresh: true })
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    // const register = () => {
    //     axios
    //     .post(
    //     "/register",
    //      {
    //         username: registerUsername,
    //         password: registerPassword,
    //         withCredentials: true,
    //        })
    //     .then((res) => console.log(res));
    //   };

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleSubmit = (event) => {
        const { username, email, password, password_confirmation } = state

        axios
            .post('/api_register', {
                username: registerUsername,
                password: registerPassword,
                withCredentials: true,
            })
            .then((response) => {
                if (response.data === 'User Created') {
                    console.log(response.data)
                    history.push({
                        pathname: '/login',
                        state: state,
                    })
                } else {
                    console.log(response.data)
                }
            })
            .catch((error) => {
                console.log('registration error', error)
            })
        event.preventDefault()
    }

    return (
        <section class='sign-in'>
            <div className='align-center'>
                <form action='' onChange={handleInputChange} onSubmit={handleSubmit}>
                    <input type='text' name='username' placeholder='Name' onChange={handleInputChange} onChange={(e) => setRegisterUsername(e.target.value)} />
                    <input type='text' name='email' placeholder='Email' onChange={handleInputChange} />
                    <input type='password' name='password' placeholder='Password' onChange={handleInputChange} onChange={(e) => setRegisterPassword(e.target.value)} />
                    <input type='password' name='password_confirmation' placeholder='Confirm Password' onChange={handleInputChange} />
                    <button onClick={handleSubmit} type='submit'>
                        Create Account
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Signup
