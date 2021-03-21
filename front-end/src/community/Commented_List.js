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

    axios('https://my.api.mockaroo.com/comment_history.json?key=a2ecc78')
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
  

          {"id":1,"post_text":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.",
          "post_image":"http://dummyimage.com/50x50.bmp/dddddd/000000",
          "post_date":"7/17/2020",
          "commented_by_username":"droobottom0",
          "commented_by_profile_image":"https://robohash.org/dolorevoluptatemrecusandae.bmp?size=50x50\u0026set=set1",
          "commented_date":"1/2/2021",
          "commented_content":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          },
          
          {"id":2,"post_text":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
          "post_image":"http://dummyimage.com/50x50.png/ff4444/ffffff",
          "post_date":"1/5/2020",
          "commented_by_username":"lfruen1",
          "commented_by_profile_image":"https://robohash.org/remplaceatcommodi.png?size=50x50\u0026set=set1",
          "commented_date":"7/20/2020",
          "commented_content":"Integer a nibh. In quis justo."
          },
          {"id":3,"post_text":"Fusce consequat. Nulla nisl. Nunc nisl.","post_image":"https://robohash.org/rerumdoloreaque.jpg?size=50x50\u0026set=set1","post_date":"1/19/2021","commented_by_username":"lloweth2","commented_by_profile_image":"http://dummyimage.com/50x50.bmp/ff4444/ffffff","commented_date":"4/13/2020","commented_content":"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."},{"id":4,"post_text":"Maecenas ut massa quis augue luctus tincidunt.","post_image":"https://robohash.org/rerumaccusantiumveritatis.bmp?size=50x50\u0026set=set1","post_date":"2/6/2020","commented_by_username":"eodulchonta3","commented_by_profile_image":"http://dummyimage.com/50x50.bmp/cc0000/ffffff","commented_date":"5/12/2020","commented_content":"Vestibulum sed magna at nunc commodo placerat."},{"id":5,"post_text":"Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.","post_image":"https://robohash.org/velsimiliqueaspernatur.png?size=50x50\u0026set=set1","post_date":"7/15/2020","commented_by_username":"istill4","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/5fa2dd/ffffff","commented_date":"10/21/2020","commented_content":"Nunc rhoncus dui vel sem. Sed sagittis."},{"id":6,"post_text":"In congue. Etiam justo.","post_image":"https://robohash.org/solutaavelit.png?size=50x50\u0026set=set1","post_date":"11/10/2020","commented_by_username":"tmcreidy5","commented_by_profile_image":"http://dummyimage.com/50x50.bmp/cc0000/ffffff","commented_date":"4/4/2020","commented_content":"Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui."},{"id":7,"post_text":"Pellentesque at nulla.","post_image":"https://robohash.org/estdoloremquevoluptas.jpg?size=50x50\u0026set=set1","post_date":"8/26/2020","commented_by_username":"srisley6","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/5fa2dd/ffffff","commented_date":"11/16/2020","commented_content":"In hac habitasse platea dictumst."},{"id":8,"post_text":"Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.","post_image":"https://robohash.org/etcorruptiplaceat.bmp?size=50x50\u0026set=set1","post_date":"4/13/2020","commented_by_username":"kdoblin7","commented_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","commented_date":"3/14/2020","commented_content":"Nunc rhoncus dui vel sem."},{"id":9,"post_text":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.","post_image":"https://robohash.org/dictacorporisaliquid.bmp?size=50x50\u0026set=set1","post_date":"10/26/2020","commented_by_username":"cupfold8","commented_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","commented_date":"10/19/2020","commented_content":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor."},{"id":10,"post_text":"Nunc purus.","post_image":"https://robohash.org/voluptasnemoipsam.bmp?size=50x50\u0026set=set1","post_date":"5/1/2020","commented_by_username":"scalliss9","commented_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","commented_date":"9/21/2020","commented_content":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."}]

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