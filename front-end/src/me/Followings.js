import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Followings.css'
import { Link, useLocation, useHistory } from 'react-router-dom'
import NameTag from '../auxiliary/NameTag'

const Followings = (props) => {
    const [data, setData] = useState([])
    const { state } = useLocation()
    const history = useHistory()

    // go back to the previous page
    const goTOPreviousPath = () => {
        history.goBack()
    }

    useEffect(() => {
        axios
            .get('/api_followings', {
                params: {
                    UserName: state.UserName,
                },
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                console.log(`error`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!
                history.push('/prelogin')
                setTimeout(() => {
                    window.location.href = window.location.href
                }, 100)
            })
    }, []) // only run it once!

    console.log(data)

    return (
        <div className='Followings'>
            <h1>Followings Page here</h1>
            <Link onClick={goTOPreviousPath.bind()}>
                <h1 id='back'>back</h1>
            </Link>
            <hr></hr>
            <section className='main-content'>
                <p>
                    {data.map((item) => (
                        <NameTag key={item.id} img={item.user_photo} UserName={item.user_name} bio={item.bio} action={item.action} />
                    ))}
                </p>
            </section>
        </div>
    )
}

export default Followings
