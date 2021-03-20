import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Community.css'
import { Search } from 'react-bootstrap-icons';
import { ChatLeftDotsFill } from 'react-bootstrap-icons';
import './Community.js'
import Message_History from './Message_History'



const Community = (props) => {
 // start a state variable with a blank array
 const [data, setData] = useState([])

 // the following side-effect will be called once upon initial render
 useEffect(() => {
   // fetch some mock data about animals for sale
   console.log('fetching message history')

   axios('https://my.api.mockaroo.com/message_history.json?key=a2ecc780')
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
        "username":"cgilligan0",
        "user_photo":"https://robohash.org/doloremqueofficiaet.jpg?size=50x50\u0026set=set1",
        "newest_message":"Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
        "unread_message_number":"6",
        "newest_message_date":"4/19/2020"},
        {"id":2,"username":"rmurkitt1","user_photo":"https://robohash.org/consequaturculpamaxime.png?size=50x50\u0026set=set1","newest_message":"Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.","unread_message_number":"7","newest_message_date":"9/30/2020"},{"id":3,"username":"fwannes2","user_photo":"https://robohash.org/voluptatemfugiatea.bmp?size=50x50\u0026set=set1","newest_message":"Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.","unread_message_number":"0","newest_message_date":"4/9/2020"},{"id":4,"username":"aopy3","user_photo":"https://robohash.org/expeditamollitianisi.bmp?size=50x50\u0026set=set1","newest_message":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.","unread_message_number":"0","newest_message_date":"1/20/2021"},{"id":5,"username":"acritchell4","user_photo":"https://robohash.org/exercitationemsintest.bmp?size=50x50\u0026set=set1","newest_message":"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.","unread_message_number":"4","newest_message_date":"10/9/2020"},{"id":6,"username":"jprozescky5","user_photo":"https://robohash.org/etconsequaturab.png?size=50x50\u0026set=set1","newest_message":"Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.","unread_message_number":"1","newest_message_date":"5/4/2020"},{"id":7,"username":"ehunnicot6","user_photo":"https://robohash.org/necessitatibusaccusantiumitaque.jpg?size=50x50\u0026set=set1","newest_message":"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","unread_message_number":"6","newest_message_date":"1/21/2021"},{"id":8,"username":"rdesporte7","user_photo":"https://robohash.org/etdoloremqueipsam.bmp?size=50x50\u0026set=set1","newest_message":"Morbi ut odio.","unread_message_number":"1","newest_message_date":"8/24/2020"},{"id":9,"username":"rnials8","user_photo":"https://robohash.org/natusautquod.bmp?size=50x50\u0026set=set1","newest_message":"Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.","unread_message_number":"2","newest_message_date":"10/25/2020"},{"id":10,"username":"lpee9","user_photo":"https://robohash.org/voluptatesnecessitatibusvoluptatibus.jpg?size=50x50\u0026set=set1","newest_message":"In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.","unread_message_number":"8","newest_message_date":"7/7/2020"}   
    ]

       setData(backupData)
     })
 }, []) // only run it once!


    return (
        <div className = "Community">
            <h1>Message</h1>
            <Link to={'/chat'}> 
                <ChatLeftDotsFill id="chat" size={17}/> 
            
            </Link>
            <div className = "main-content">
                
                <Link class='icon' to={'/mentions'}> 
                        <p id="mentions">
                            Mentions
                        </p>
                </Link>
                <Link class='icon' to={'/comments'}>
                        <p id="comments">
                            Comments
                        </p>
                </Link>

                <Link class='icon' to={'/likes'}>
                        <p id="likes">
                            Likes
                        </p>
                </Link>
            </div>

            <div >
                <input id="search" placeholder="  Search here">
                </input>
                <Search id='search_icon' color="grey" size={17} />
                
            </div>

            <section className = "message_list">
                {data.map((item) => (
                    <Message_History key={item.id} details={item} />
                ))}
            </section>
        </div>

        
    );
}

export default Community;