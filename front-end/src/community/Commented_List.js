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
          {"post_text":"Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","post_date":"12/29/2020","commented_by_username":"avanin0","commented_by_profile_image":"http://dummyimage.com/50x50.bmp/cc0000/ffffff","commented_date":"1/2/2021","commented_content":"In congue. Etiam justo."},{"post_text":"Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"4/25/2020","commented_by_username":"civanenkov1","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/5fa2dd/ffffff","commented_date":"4/3/2020","commented_content":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci."},{"post_text":"In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"3/14/2020","commented_by_username":"fdanielsen2","commented_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","commented_date":"4/5/2020","commented_content":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices."},{"post_text":"Aenean sit amet justo. Morbi ut odio.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"10/11/2020","commented_by_username":"ktomaschke3","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/ff4444/ffffff","commented_date":"11/21/2020","commented_content":"Suspendisse potenti."},{"post_text":"Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"12/7/2020","commented_by_username":"vmather4","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","commented_date":"1/19/2021","commented_content":"Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."},{"post_text":"Morbi non quam nec dui luctus rutrum. Nulla tellus.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"9/8/2020","commented_by_username":"wpavett5","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/dddddd/000000","commented_date":"5/14/2020","commented_content":"Etiam pretium iaculis justo."},{"post_text":"Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"12/24/2020","commented_by_username":"breaditt6","commented_by_profile_image":"http://dummyimage.com/50x50.png/ff4444/ffffff","commented_date":"9/24/2020","commented_content":"Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."},{"post_text":"Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"2/23/2021","commented_by_username":"ukenwood7","commented_by_profile_image":"http://dummyimage.com/50x50.png/cc0000/ffffff","commented_date":"8/1/2020","commented_content":"Suspendisse potenti. Cras in purus eu magna vulputate luctus."},{"post_text":"Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.","post_image":"http://dummyimage.com/80x80.bmp/ff4444/ffffff","post_date":"10/26/2020","commented_by_username":"blusk8","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/5fa2dd/ffffff","commented_date":"3/29/2020","commented_content":"Donec dapibus. Duis at velit eu est congue elementum."},{"post_text":"Integer tincidunt ante vel ipsum.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"7/28/2020","commented_by_username":"mholtaway9","commented_by_profile_image":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","commented_date":"9/28/2020","commented_content":"Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."}
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