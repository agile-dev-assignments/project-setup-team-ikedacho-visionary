import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import './Commented_List.css'
import Commented from '../auxiliary/Commented'

const Commented_List = (props) => {
  // start a state variable with a blank array
  const [data, setData] = useState([])

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log('fetching commented_history')

    axios('http://localhost:3000/')
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
        {"id":1,
        "post_text":"Vestibulum ac est lacinia nisi venenatis tristique.",
        "post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff",
        "post_date":"1/16/2020",
        "commented_by_username":"mborell0",
        "commented_by_profile_image":"https://robohash.org/occaecatiutfacilis.jpg?size=50x50\u0026set=set1",
        "commented_date":"4/14/2020"
        ,"commented_content":"Proin eu mi."},
        {"id":2,
        "post_text":"Integer ac neque.",
        "post_image":"http://dummyimage.com/80x80.bmp/5fa2dd/ffffff",
        "post_date":"7/29/2020",
        "commented_by_username":"tkrates1",
        "commented_by_profile_image":"https://robohash.org/doloremagniconsequatur.png?size=50x50\u0026set=set1",
        "commented_date":"4/21/2020",
        "commented_content":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl."},
        {"id":3,"post_text":"Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"1/9/2021","commented_by_username":"ecumbes2","commented_by_profile_image":"https://robohash.org/accusantiumsedquasi.bmp?size=50x50\u0026set=set1","commented_date":"12/5/2020","commented_content":"Nullam sit amet turpis elementum ligula vehicula consequat."},{"id":4,"post_text":"Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"11/19/2020","commented_by_username":"kpirt3","commented_by_profile_image":"https://robohash.org/omnisidconsequatur.bmp?size=50x50\u0026set=set1","commented_date":"9/25/2020","commented_content":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."},{"id":5,"post_text":"Curabitur convallis.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"2/13/2021","commented_by_username":"bbarehead4","commented_by_profile_image":"https://robohash.org/praesentiumassumendadoloremque.bmp?size=50x50\u0026set=set1","commented_date":"5/28/2020","commented_content":"Morbi a ipsum."},{"id":6,"post_text":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"9/30/2020","commented_by_username":"mdowtry5","commented_by_profile_image":"https://robohash.org/quinatusipsum.png?size=50x50\u0026set=set1","commented_date":"12/26/2020","commented_content":"Proin eu mi."},{"id":7,"post_text":"Sed ante. Vivamus tortor.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"4/21/2020","commented_by_username":"iwalcot6","commented_by_profile_image":"https://robohash.org/rerumquisquammaxime.jpg?size=50x50\u0026set=set1","commented_date":"3/19/2020","commented_content":"Sed ante."},{"id":8,"post_text":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"10/27/2020","commented_by_username":"kkeble7","commented_by_profile_image":"https://robohash.org/voluptatemsitvoluptas.jpg?size=50x50\u0026set=set1","commented_date":"2/3/2021","commented_content":"Curabitur gravida nisi at nibh."},{"id":9,"post_text":"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"7/15/2020","commented_by_username":"cingre8","commented_by_profile_image":"https://robohash.org/etdoloreaut.bmp?size=50x50\u0026set=set1","commented_date":"10/18/2020","commented_content":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa."},{"id":10,"post_text":"Proin eu mi. Nulla ac enim.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"9/3/2020","commented_by_username":"cboodle9","commented_by_profile_image":"https://robohash.org/maximenemodolor.png?size=50x50\u0026set=set1","commented_date":"4/21/2020","commented_content":"Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."}
        ]
        setData(backupData)
      })
  }, []) // only run it once!

  return (
    <div className="Commented_List">
        <Link to={'/community'}> 
        
        <h1 id="back" >Back</h1>
        </Link>
        <h1 id='title'>Comments</h1>
      
      <section className="commented_list">
        {data.map((item) => (
          <Commented key={item.id} details={item} />
        ))}
        
      </section>
    </div>
  )
}

export default Commented_List