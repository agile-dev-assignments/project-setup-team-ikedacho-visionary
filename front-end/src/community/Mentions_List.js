import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Mentions_List.css'
import Mentions from './Mentions'
import { useHistory } from 'react-router-dom'

const Mentions_List = (props) => {
    const [data, setData] = useState([])
    let history = useHistory()

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
            .get('/api_being_mentioned')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        alert('You are not logged in. Please log in and try again!')
                        history.push('/prelogin')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
            })
    }, []) // only run it once!

    console.log('data fetched from backend: ', data)

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

    bubbleSort(data, 'mentioned_date')
    // console.log("sorted!", unsorted)

    console.log(data)

    return (
        <div className='Mentions_List'>
            <Link to={'/community'}>
                <h1 id='back'>Back</h1>
            </Link>

            <h1 id='title'>Mentions</h1>

            <section className='Mentions_List'>
                {data.map((item) => (
                    <Mentions key={item.id} details={item} />
                ))}
            </section>
        </div>
    )
}

export default Mentions_List
