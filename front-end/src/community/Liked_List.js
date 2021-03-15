import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import './Liked_List.css'
import Liked from '../auxiliary/Liked'

const Liked_List = (props) => {
  // start a state varaible with a blank array
  const [data, setData] = useState([])

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log('fetching liked_history')

    axios('https://my.api.mockaroo.com/liked_history.json?key=a2ecc780')
      .then((response) => {
        // extract the data from the server response
        setData(response.data)
      })
      .catch((err) => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data of commented_history
        const backupData = [
          {
            post_text: "Play with my dog.",
            post_image: "http://dummyimage.com/80x80.jpg/dddddd/000000",
            post_date: "9/10/2020",
            liked_by_username: "helin123",
            liked_by_profile_image: "http://dummyimage.com/50x50.jpg/cc0000/ffffff",
            liked_date: "9/20/2020",
        
          },
          {
            post_text: "Play with my cat.",
            post_image: "http://dummyimage.com/80x80.png/dddddd/000000",
            post_date: "9/13/2020",
            liked_by_username: "efivey1",
            liked_by_profile_image: "http://dummyimage.com/50x50.png/ff4444/ffffff",
            liked_date: "9/21/2020",
           
          },
        ]

        setData(backupData)
      })
  }, []) // only run it once!

  return (
    <div className="Liked_List">
        <Link to={'/community'}> 
        
            <h1 id="back" >Back</h1>
        </Link>

        <h1>Likes</h1>
      
      <section className="liked_list">
        {data.map((item) => (
          <Liked details={item} />
        ))}
        
      </section>
    </div>
  )
}

export default Liked_List