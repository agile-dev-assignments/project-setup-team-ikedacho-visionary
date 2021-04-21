import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import './WhatsNew.css'
import { useHistory, useLocation } from 'react-router-dom'

const WhatsNew = (props) => {
    const [post_data, setData] = useState([])
    //const [userdata, setUserData] = useState([]);

    //platform the is selected by user who browser the page
    let [platform_name_array, setPlatform_name_array] = useState([])

    let history = useHistory()
    // const {state} = useLocation();
    //     props =
    // (props.location && props.location.props) || {};

    // setData(props.location.props);
    // console.log(props.location.props);
    const goTOPreviousPath = () => {
        history.goBack()
    }
    const [UserData, setUserData] = useState([
        {
            username: '',
            email: '',
        },
    ])

    const getUser = () => {
        axios('/user').then((response) => {
            setUserData(response.data)
        })
    }

    // useEffect(() => {
    //     const userdatadisplay = { username: state.username , email: state.password}
    // setUserData(userdatadisplay);
    // }, []) // only run it once!

    // before we figure out how login system would work, these following lines should remain commented
    /*
        useEffect(() => {
            const userdatadisplay = { username: state.username , email: state.email}
        setUserData(userdatadisplay);
            }, []) // only run it once!
        console.log("logged in as: "+ UserData.username);
        */

    //console.log("logged in as: "+ UserData.username);
    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
            .get('/api_whatsnew', {})
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!
                // make some backup fake data of commented_history
                history.push('/prelogin')
                setTimeout(() => {
                    window.location.href = window.location.href
                }, 100)
            })
    }, []) // only run it once!

    return (
        <div className='WhatsNew'>
            <section className='main-content'>
                {post_data.map((item) => (
                    <PostContent key={item.id} like_switch = {item.like_switch} source={item.source} userimg={item.userimg} UserName={item.UserName} content={item.content} Senttime={item.senttime} contentimg={item.contentimg} />
                ))}
            </section>
        </div>
    )
}

export default WhatsNew
