import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import './My_Comment_History_List.css'
import My_Comment_History from './My_Comment_History'

const My_Comment_History_List = (props) => {
  // start a state variable with a blank array
  const [data, setData] = useState([])

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log('fetching my comment history')

    axios('https://my.api.mockaroo.com/my_comment_history.json?key=a2ecc780')
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
            "post_created_by":"ldermott0",
            "post_text":"Praesent blandit. Nam nulla.",
            "post_image":"http://dummyimage.com/80x80.jpg/cc0000/ffffff",
            "commented_date":"4/16/2020",
            "commented_content":"Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
            },

            {"id":2,
            "post_created_by":"bdrake1",
            "post_text":"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
            "post_image":"http://dummyimage.com/80x80.bmp/5fa2dd/ffffff",
            "commented_date":"9/19/2020",
            "commented_content":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
            },

            {"id":3,"post_created_by":"bbarfoot2","post_text":"Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","commented_date":"5/13/2020","commented_content":"Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci."},{"id":4,"post_created_by":"rgoulstone3","post_text":"Mauris sit amet eros.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","commented_date":"2/18/2021","commented_content":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue."},{"id":5,"post_created_by":"kprimo4","post_text":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","commented_date":"2/11/2021","commented_content":"Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia."},{"id":6,"post_created_by":"sbazoge5","post_text":"Proin at turpis a pede posuere nonummy.","post_image":"http://dummyimage.com/80x80.jpg/cc0000/ffffff","commented_date":"8/11/2020","commented_content":"Etiam vel augue. Vestibulum rutrum rutrum neque."},{"id":7,"post_created_by":"boakenfall6","post_text":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","commented_date":"4/21/2020","commented_content":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue."},{"id":8,"post_created_by":"rweed7","post_text":"Duis mattis egestas metus. Aenean fermentum.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","commented_date":"11/17/2020","commented_content":"Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."},{"id":9,"post_created_by":"ghansemann8","post_text":"Curabitur at ipsum ac tellus semper interdum.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","commented_date":"8/3/2020","commented_content":"Praesent lectus."},{"id":10,"post_created_by":"lsparrowe9","post_text":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.","post_image":"http://dummyimage.com/80x80.jpg/cc0000/ffffff","commented_date":"2/19/2021","commented_content":"Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat."}]
        setData(backupData)
      })
  }, []) // only run it once!

  return (
    <div className="My_Comment_History_List">
        <Link to={'/me'}> 
        
        <h1 id="back" >Back</h1>
        </Link>
        <h1 id='title'>My Comment History</h1>
      
      <section className="My_Comment_History_List">
        {data.map((item) => (
          <My_Comment_History key={item.id} details={item} />
        ))}
        
      </section>
    </div>
  )
}

export default My_Comment_History_List