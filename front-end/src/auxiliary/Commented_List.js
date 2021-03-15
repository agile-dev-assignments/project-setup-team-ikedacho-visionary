import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import './Commented_List.css'
import Commented from './Commented'

const Commented_List = (props) => {
  // start a state varaible with a blank array
  const [data, setData] = useState([])

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log('fetching commented_history')

    axios('https://my.api.mockaroo.com/comment_history.json?key=a2ecc780')
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
            commented_by_username: "helin123",
            commented_by_profile_image: "http://dummyimage.com/50x50.jpg/cc0000/ffffff",
            commented_date: "9/20/2020",
            commented_content: "Lovely dog."
          },
          {
            post_text: "Play with my cat.",
            post_image: "http://dummyimage.com/80x80.png/dddddd/000000",
            post_date: "9/13/2020",
            commented_by_username: "efivey1",
            commented_by_profile_image: "http://dummyimage.com/50x50.png/ff4444/ffffff",
            commented_date: "9/21/2020",
            commented_content: "Lovely cat."
          },
        ]

        setData(backupData)
      })
  }, []) // only run it once!

  return (
    <div className="Commented_List">
        <Link to={'/community'}> 
        
        <h1 id="back" >Back</h1>
        </Link>
        <h1>Comments</h1>
      
      <section className="commented_list">
        {data.map((item) => (
          <Commented details={item} />
        ))}
        
      </section>
    </div>
  )
}

export default Commented_List