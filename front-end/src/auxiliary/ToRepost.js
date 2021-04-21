import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './ToRepost.css'
import ToRepost_edit from './ToRepost_edit'

const Repost = (props) => {
    const [platform, setPlatform] = useState([])
    const [state, setState] = useState({
        showRepostEdit: false,
    })

    const history = useHistory()

    const _showRepostEdit = () => {
        let cur = state.showRepostEdit
        setState({
            showRepostEdit: !cur,
        })
    }

    const fastRepost = () => {
        axios
            .get('/get_fast_repost', {
                params: {
                    // post_text: post_text,
                },
            })
            .then((response) => {})
            .catch((err) => {
                console.error(err)
            })
        alert('new post is sent!')
        setTimeout(() => {
            window.location.href = window.location.href
        }, 100)
    }

    const Repost = () => {
        window.location.href = '/repost'
    }

    const Friends = (props) => {
        return (
            <div className='repost_friends_component'>
                <img className='repost_avatar' src={props.pic} />
                <button
                    onClick={() => {
                        alert('A friends is clicked')
                    }}
                    className='repost_friends'
                >
                    {props.name}
                </button>
            </div>
        )
    }

    const Platform = (props) => {
        return (
            <div className='repost_share_to_platforms'>
                <button
                    onClick={() => {
                        alert('A platform is clicked')
                    }}
                    className='repost_share_to_platforms'
                >
                    {props.name}
                </button>
            </div>
        )
    }

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios('get_repost')
            .then((response) => {
                // extract the data from the server response
                setPlatform(response.data.linked_social_media)
            })
            .catch((err) => {})
    }, []) // only run it once!

    // alert should be replaced by actual APIs
    // for some reasons the alert() for buttons in loop does not work
    return (
        <div className='ToRepost'>
            <button className='Repost_fast' onClick={fastRepost}>
                Fast Repost
            </button>
            <button className='Repost_edit_button' onClick={Repost}>
                Repost
            </button>

        </div>
    )
}

export default Repost
