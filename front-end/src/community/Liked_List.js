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
          {"id":1,"post_text":"Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
          "post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff",
          "post_date":"10/31/2020",
          "liked_by_username":"nmandell0",
          "liked_by_profile_image":"https://robohash.org/sedillumquis.jpg?size=50x50\u0026set=set1",
          "liked_date":"5/2/2020"},
          {"id":2,"post_text":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.",
          "post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff",
          "post_date":"12/21/2020",
          "liked_by_username":"fbaterip1",
          "liked_by_profile_image":"https://robohash.org/estdoloreest.jpg?size=50x50\u0026set=set1",
          "liked_date":"3/16/2020"},
          {"id":3,"post_text":"Morbi non quam nec dui luctus rutrum.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"11/13/2020","liked_by_username":"fcopello2","liked_by_profile_image":"https://robohash.org/molestiaemaximenumquam.png?size=50x50\u0026set=set1","liked_date":"8/13/2020"},{"id":4,"post_text":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"6/8/2020","liked_by_username":"pgreenalf3","liked_by_profile_image":"https://robohash.org/corporisillumrerum.jpg?size=50x50\u0026set=set1","liked_date":"9/14/2020"},{"id":5,"post_text":"Phasellus in felis.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"12/5/2020","liked_by_username":"iseebright4","liked_by_profile_image":"https://robohash.org/inciduntuttenetur.png?size=50x50\u0026set=set1","liked_date":"11/21/2020"},{"id":6,"post_text":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"5/2/2020","liked_by_username":"gbourley5","liked_by_profile_image":"https://robohash.org/evenietconsequunturlabore.png?size=50x50\u0026set=set1","liked_date":"9/26/2020"},{"id":7,"post_text":"Nulla ut erat id mauris vulputate elementum. Nullam varius.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"4/25/2020","liked_by_username":"mutteridge6","liked_by_profile_image":"https://robohash.org/quoindignissimos.jpg?size=50x50\u0026set=set1","liked_date":"4/10/2020"},{"id":8,"post_text":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"11/23/2020","liked_by_username":"mpreece7","liked_by_profile_image":"https://robohash.org/accusantiumminimaquo.bmp?size=50x50\u0026set=set1","liked_date":"9/3/2020"},{"id":9,"post_text":"Mauris sit amet eros.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"5/14/2020","liked_by_username":"elowres8","liked_by_profile_image":"https://robohash.org/cumquenecessitatibustempore.bmp?size=50x50\u0026set=set1","liked_date":"4/29/2020"},{"id":10,"post_text":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"11/11/2020","liked_by_username":"aclarridge9","liked_by_profile_image":"https://robohash.org/quiasequirepellat.png?size=50x50\u0026set=set1","liked_date":"1/22/2021"}]
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