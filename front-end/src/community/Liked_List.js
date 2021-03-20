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
          {"id":1,"post_text":"Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
          "post_image":"https://robohash.org/repellendusinciduntrepudiandae.jpg?size=50x50\u0026set=set1",
          "post_date":"7/17/2020",
          "liked_by_username":"tmurby0",
          "liked_by_profile_image":"http://dummyimage.com/50x50.bmp/5fa2dd/ffffff",
          "liked_date":"8/24/2020"
          },
          {"id":2,"post_text":"Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
          "post_image":"https://robohash.org/atautfugiat.bmp?size=50x50\u0026set=set1",
          "post_date":"2/9/2021",
          "liked_by_username":"rjarratt1",
          "liked_by_profile_image":"http://dummyimage.com/50x50.bmp/5fa2dd/ffffff",
          "liked_date":"11/8/2020"
          },
          {"id":3,"post_text":"Integer a nibh.","post_image":"https://robohash.org/remimpeditiusto.png?size=50x50\u0026set=set1","post_date":"4/10/2020","liked_by_username":"acornilli2","liked_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","liked_date":"3/30/2020"},{"id":4,"post_text":"Suspendisse potenti. Cras in purus eu magna vulputate luctus.","post_image":"https://robohash.org/velcumsit.png?size=50x50\u0026set=set1","post_date":"10/22/2020","liked_by_username":"gtremellan3","liked_by_profile_image":"http://dummyimage.com/50x50.png/dddddd/000000","liked_date":"7/28/2020"},{"id":5,"post_text":"Nulla mollis molestie lorem. Quisque ut erat.","post_image":"https://robohash.org/deseruntdebitisfacilis.png?size=50x50\u0026set=set1","post_date":"2/4/2021","liked_by_username":"oachurch4","liked_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","liked_date":"10/4/2020"},{"id":6,"post_text":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"https://robohash.org/dictaducimusoccaecati.bmp?size=50x50\u0026set=set1","post_date":"9/1/2020","liked_by_username":"amenchenton5","liked_by_profile_image":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","liked_date":"11/29/2020"},{"id":7,"post_text":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.","post_image":"https://robohash.org/sitvoluptatemdeleniti.bmp?size=50x50\u0026set=set1","post_date":"1/20/2021","liked_by_username":"csemmens6","liked_by_profile_image":"http://dummyimage.com/50x50.png/ff4444/ffffff","liked_date":"10/15/2020"},{"id":8,"post_text":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.","post_image":"https://robohash.org/quasinequeharum.bmp?size=50x50\u0026set=set1","post_date":"3/9/2021","liked_by_username":"alarchiere7","liked_by_profile_image":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","liked_date":"4/19/2020"},{"id":9,"post_text":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.","post_image":"https://robohash.org/excepturivelvero.png?size=50x50\u0026set=set1","post_date":"9/11/2020","liked_by_username":"ciorio8","liked_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","liked_date":"1/4/2021"},{"id":10,"post_text":"Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.","post_image":"https://robohash.org/velitsitconsectetur.png?size=50x50\u0026set=set1","post_date":"4/26/2020","liked_by_username":"lwithams9","liked_by_profile_image":"http://dummyimage.com/50x50.bmp/ff4444/ffffff","liked_date":"8/15/2020"}]
        setData(backupData)
      })
  }, []) // only run it once!

  return (
    <div className="Liked_List">
        <Link to={'/community'}> 
        
            <h1 id="back" >Back</h1>
        </Link>

        <h1 id='title'>Likes</h1>
      
      <section className="liked_list">
        {data.map((item) => (
          <Liked key={item.id} details={item} />
        ))}
        
      </section>
    </div>
  )
}

export default Liked_List