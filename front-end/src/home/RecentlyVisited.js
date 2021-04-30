import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import './RecentlyVisited.css'

const RecentlyVisited = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
        .get('/api_recent')
        .then((response) => {
            // extract the data from the server response
            setData(response.data)
        })
        .catch((err) => {
            console.log(err)
            console.error(err) 
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

    bubbleSort(data, 'viewdate')

    console.log(data)

    return (
        <div className='Recently-Visited'>
            <section className='main-content'>
                {data.map((item) => (
                    <PostContent key={item._id} like_switch = {item.like_switch} source={item.source} userimg={item.userimg} UserName={item.UserName} content={item.content} Senttime={item.senttime} contentimg={item.contentimgs} />
                ))}
            </section>
        </div>
    )
}

export default RecentlyVisited
