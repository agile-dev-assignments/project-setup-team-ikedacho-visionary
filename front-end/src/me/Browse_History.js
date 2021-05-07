import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Browse from '../auxiliary/Browse'
import './Browse_History.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Browse_History = (props) => {
    const [PostData, setPostData] = useState([])

    let history = useHistory()
    useEffect(() => {
        axios
            .get('/api_browse')
            .then((response) => {
                // extract the data from the server response
                setPostData(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        alert('You are not logged in. Please log in and try again!')
                        history.push('/login')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
            })
    }, []) // only run it once!

    // fascinating bubble sort, killer of time complexity
    function bubbleSort(array, property) {
        let swapped
        do {
            swapped = false
            for (let i = 0; i < array.length - 1; i++) {
                const date1 = new Date(array[i][property]).getTime()
                const date2 = new Date(array[i + 1][property]).getTime()
                // console.log("------", date1)
                // console.log("======", date2)
                if (date1 < date2) {
                    let temp = array[i]
                    array[i] = array[i + 1]
                    array[i + 1] = temp
                    swapped = true
                }
            }
        } while (swapped)
    }

    bubbleSort(PostData, 'viewdate')

    console.log(PostData)

    return (
        <div className='Browse_History'>
            <Link to='/Me'>
                <h1 id='back'>back</h1>
            </Link>
            <h1>Browse History</h1>
            <hr></hr>

            <div className='Browse_List'>
                {PostData.map(
                    (item) => (console.log('rendering'), (<Browse viewdate={item.viewdate} UserName={item.UserName} userimg={item.userimg} content={item.content} contentimgs={item.contentimgs} />))
                )}
            </div>
        </div>
    )
}

export default Browse_History
