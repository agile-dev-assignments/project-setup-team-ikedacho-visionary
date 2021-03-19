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
          {"post_text":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"11/28/2020","liked_by_username":"rtownrow0","liked_by_profile_image":"http://dummyimage.com/50x50.bmp/5fa2dd/ffffff","liked_date":"1/4/2021"},{"post_text":"Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.","post_image":"http://dummyimage.com/80x80.jpg/cc0000/ffffff","post_date":"8/10/2020","liked_by_username":"upudan1","liked_by_profile_image":"http://dummyimage.com/50x50.bmp/dddddd/000000","liked_date":"2/18/2021"},{"post_text":"Fusce consequat.","post_image":"http://dummyimage.com/80x80.bmp/5fa2dd/ffffff","post_date":"2/5/2021","liked_by_username":"bnewbigging2","liked_by_profile_image":"http://dummyimage.com/50x50.bmp/dddddd/000000","liked_date":"5/2/2020"},{"post_text":"Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","post_date":"10/28/2020","liked_by_username":"dblannin3","liked_by_profile_image":"http://dummyimage.com/50x50.bmp/5fa2dd/ffffff","liked_date":"10/14/2020"},{"post_text":"Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","post_date":"1/14/2021","liked_by_username":"adonnett4","liked_by_profile_image":"http://dummyimage.com/50x50.jpg/dddddd/000000","liked_date":"6/17/2020"},{"post_text":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"12/19/2020","liked_by_username":"epollicote5","liked_by_profile_image":"http://dummyimage.com/50x50.bmp/dddddd/000000","liked_date":"9/15/2020"},{"post_text":"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","post_image":"http://dummyimage.com/80x80.bmp/ff4444/ffffff","post_date":"6/3/2020","liked_by_username":"bthumnel6","liked_by_profile_image":"http://dummyimage.com/50x50.png/dddddd/000000","liked_date":"6/26/2020"},{"post_text":"Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"3/10/2021","liked_by_username":"mmaling7","liked_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","liked_date":"10/18/2020"},{"post_text":"In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.","post_image":"http://dummyimage.com/80x80.png/cc0000/ffffff","post_date":"10/2/2020","liked_by_username":"tcodrington8","liked_by_profile_image":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","liked_date":"4/28/2020"},{"post_text":"Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"5/14/2020","liked_by_username":"mattwool9","liked_by_profile_image":"http://dummyimage.com/50x50.jpg/5fa2dd/ffffff","liked_date":"10/20/2020"}
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