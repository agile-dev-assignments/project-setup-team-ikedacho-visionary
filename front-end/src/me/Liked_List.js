import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import logo from './logo.svg';
import Liked from './Liked'

const Liked_List = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])

    useEffect(() => {
        axios('https://my.api.mockaroo.com/liked_history.json?key=49286830')
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err)
                const backupData = [{
                    "post_text": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
                    "post_image": "http://dummyimage.com/80x80.jpg/ff4444/ffffff",
                    "post_date": "2/2/2021",
                    "liked_by_username": "slewinton0",
                    "liked_by_profile": "http://dummyimage.com/50x50.bmp/ff4444/ffffff",
                    "liked_date": "7/30/2020",
                    "liked_content": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh."
                }, {
                    "post_text": "Ut at dolor quis odio consequat varius.",
                    "post_image": "http://dummyimage.com/80x80.jpg/cc0000/ffffff",
                    "post_date": "11/1/2020",
                    "liked_by_username": "etapton1",
                    "liked_by_profile": "http://dummyimage.com/50x50.png/5fa2dd/ffffff",
                    "liked_date": "3/12/2021",
                    "liked_content": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem."
                }, {
                    "post_text": "Phasellus sit amet erat.",
                    "post_image": "http://dummyimage.com/80x80.bmp/cc0000/ffffff",
                    "post_date": "12/14/2020",
                    "liked_by_username": "efellnee2",
                    "liked_by_profile": "http://dummyimage.com/50x50.bmp/5fa2dd/ffffff",
                    "liked_date": "12/18/2020",
                    "liked_content": "In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh."
                }, {
                    "post_text": "Integer ac leo.",
                    "post_image": "http://dummyimage.com/80x80.bmp/5fa2dd/ffffff",
                    "post_date": "5/3/2020",
                    "liked_by_username": "adufton3",
                    "liked_by_profile": "http://dummyimage.com/50x50.png/dddddd/000000",
                    "liked_date": "3/8/2021",
                    "liked_content": "Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
                }, {
                    "post_text": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
                    "post_image": "http://dummyimage.com/80x80.bmp/5fa2dd/ffffff",
                    "post_date": "1/21/2021",
                    "liked_by_username": "sbennie4",
                    "liked_by_profile": "http://dummyimage.com/50x50.bmp/dddddd/000000",
                    "liked_date": "11/26/2020",
                    "liked_content": "Vivamus tortor. Duis mattis egestas metus. Aenean fermentum."
                }, {
                    "post_text": "Nunc purus.",
                    "post_image": "http://dummyimage.com/80x80.png/ff4444/ffffff",
                    "post_date": "8/22/2020",
                    "liked_by_username": "mmattek5",
                    "liked_by_profile": "http://dummyimage.com/50x50.png/dddddd/000000",
                    "liked_date": "7/14/2020",
                    "liked_content": "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
                }, {
                    "post_text": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
                    "post_image": "http://dummyimage.com/80x80.bmp/5fa2dd/ffffff",
                    "post_date": "10/18/2020",
                    "liked_by_username": "clanglois6",
                    "liked_by_profile": "http://dummyimage.com/50x50.jpg/dddddd/000000",
                    "liked_date": "9/5/2020",
                    "liked_content": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."
                }, {
                    "post_text": "Etiam vel augue. Vestibulum rutrum rutrum neque.",
                    "post_image": "http://dummyimage.com/80x80.png/ff4444/ffffff",
                    "post_date": "2/19/2021",
                    "liked_by_username": "ltidd7",
                    "liked_by_profile": "http://dummyimage.com/50x50.jpg/cc0000/ffffff",
                    "liked_date": "5/7/2020",
                    "liked_content": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci."
                }, {
                    "post_text": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
                    "post_image": "http://dummyimage.com/80x80.png/ff4444/ffffff",
                    "post_date": "4/21/2020",
                    "liked_by_username": "bhuggon8",
                    "liked_by_profile": "http://dummyimage.com/50x50.jpg/ff4444/ffffff",
                    "liked_date": "8/2/2020",
                    "liked_content": "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                }, {
                    "post_text": "In quis justo. Maecenas rhoncus aliquam lacus.",
                    "post_image": "http://dummyimage.com/80x80.png/dddddd/000000",
                    "post_date": "5/30/2020",
                    "liked_by_username": "timos9",
                    "liked_by_profile": "http://dummyimage.com/50x50.bmp/5fa2dd/ffffff",
                    "liked_date": "3/30/2020",
                    "liked_content": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc."
                }]
                setData(backupData)
            })
    }, [])

    return (
        <div className="Liked_List">
            <Link to={'/me'}>
                <h1 id="back">Back</h1>
            </Link>
            <h1 id='title'>Liked Content</h1>
            <section className="Liked_List">
                {data.map((item) => (
                    <Liked key={item.id} details={item}/>
                ))}
            </section>
        </div>
    )
}

export default Liked_List
