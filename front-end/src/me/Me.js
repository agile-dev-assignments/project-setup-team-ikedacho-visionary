import React, { useState, useEffect } from 'react'
import './Me.css'
import { Link } from 'react-router-dom'
import { PersonPlus } from 'react-bootstrap-icons'
import { Gear } from 'react-bootstrap-icons'
import { ClockHistory } from 'react-bootstrap-icons'
import { TextParagraph } from 'react-bootstrap-icons'
import { HeartFill } from 'react-bootstrap-icons'

import axios from 'axios'
import Linked_platform_connect from './Linked_platform_connect'
import Unconnected_social_media from './Unconnected_social_media'

const Me = (props) => {
	//set user_info
	const [user_info, setUser_info] = useState([])
	//set linked_social_media
	let [linked_social_media, setLinked_social_media] = useState([])
	let [
		clicked_linked_social_media,
		SetClicked_linked_social_media,
	] = useState([])

	let [unconnected_social_media, setUnconnected_social_media] = useState([])
	let [
		clicked_unconnected_social_media,
		SetClicked_unconnected_social_media,
	] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			await axios('/get_me', {
				params: {
					clicked_linked_social_media: clicked_linked_social_media,
					clicked_unconnected_social_media: clicked_unconnected_social_media,
				},
			})
				.then((response) => {
					setUser_info(response.data.user_info)

					setLinked_social_media(response.data.linked_social_media)
					console.log('linked', response.data.linked_social_media)
					setUnconnected_social_media(
						response.data.unconnected_social_media
					)
					console.log(
						'unconnected',
						response.data.unconnected_social_media
					)

					let elements = document.getElementsByTagName('BUTTON')
					console.log('elements of BUTTON:', elements)
					console.log('elements.length:', elements.length)
					for (
						let i = 0;
						i < response.data.linked_social_media.length;
						i++
					) {
						//console.log(i,"th iteration")
						// console.log("elements:", elements[i])

						let element = elements[i]

						if (element.id === 'O-Zone') {
							// console.log("enter O-zone block")
							element.addEventListener('click', function () {
								console.log('selected O-Zone')
								SetClicked_linked_social_media('O-Zone')
								alert('Do you want to unconnect O-Zone')
								//refresh the page to get rid of O-zone icon
								window.location.href = window.location.href
							})
						} else if (element.id === 'Facebook') {
							//console.log("enter Facebook block")
							element.addEventListener('click', function () {
								console.log('selected Facebook')
								SetClicked_linked_social_media('Facebook')
								alert('Do you want to unconnect Facebook')
								//refresh the page to get rid of facebook icon
								window.location.href = window.location.href
							})
						} else if (element.id === 'Twitter') {
							// console.log("enter Twitter block")
							element.addEventListener('click', function () {
								console.log('selected Twitter')
								SetClicked_linked_social_media('Twitter')
								alert('Do you want to unconnect Twitter')
								//refresh the page to get rid of twitter icon
								window.location.href = window.location.href
							})
						} else if (element.id === 'Instagram') {
							//  console.log("enter Instagram block")
							element.addEventListener('click', function () {
								console.log('selected Instagram')
								SetClicked_linked_social_media('Instagram')
								alert('Do you want to unconnect Instagram')
								//refresh the page to get rid of instagram icon
								window.location.href = window.location.href
							})
						}
					}

					//deal with unconnected social media
					for (
						let i = response.data.linked_social_media.length;
						i < elements.length;
						i++
					) {
						//console.log(i,"th iteration")
						// console.log("elements:", elements[i])

						let element = elements[i]

						if (element.id === 'O-Zone') {
							// console.log("enter O-zone block")
							element.addEventListener('click', function () {
								console.log('selected O-Zone')
								SetClicked_unconnected_social_media('O-Zone')
								alert('Do you want to connect O-Zone')
								//refresh the page to get rid of O-zone icon
								window.location.href = window.location.href
							})
						} else if (element.id === 'Facebook') {
							// console.log("enter Facebook block")
							element.addEventListener('click', function () {
								console.log('selected Facebook')
								SetClicked_unconnected_social_media('Facebook')
								alert('Do you want to connect Facebook')
								//refresh the page to get rid of facebook icon
								window.location.href = window.location.href
							})
						} else if (element.id === 'Twitter') {
							//  console.log("enter Twitter block")
							element.addEventListener('click', function () {
								console.log('selected Twitter')
								SetClicked_unconnected_social_media('Twitter')
								alert('Do you want to connect Twitter')
								//refresh the page to get rid of twitter icon
								window.location.href = window.location.href
							})
						} else if (element.id === 'Instagram') {
							//console.log("enter Instagram block")
							element.addEventListener('click', function () {
								console.log('selected Instagram')
								SetClicked_unconnected_social_media('Instagram')
								alert('Do you want to connect Instagram')
								//refresh the page to get rid of instagram icon
								window.location.href = window.location.href
							})
						}
					}
				})
				.catch((err) => {
					console.log('error:', err)
				})
			console.log(
				'clicked_linked_social_media:',
				clicked_linked_social_media
			)
		}
		fetchData()
	}, [clicked_linked_social_media, clicked_unconnected_social_media])

	return (
		<div className='Me'>
			<section id='header'>
				<Link to={'/friend_suggestion'}>
					<PersonPlus id='addFriend' color='black' size={17} />
				</Link>

				<h1>Me</h1>

				<Link to={'/settings'}>
					<Gear id='setting' color='black' size={17} />
				</Link>
			</section>

			<section id='main_container1'>
				<Link to='/my_profile'>
					<div>
						<p id='message_text'>
							<img
								class='inline-block'
								id='avatar'
								src={user_info.user_photo}
							/>
							<span class='inline-block' id='username'>
								{user_info.user_name}
							</span>
							<div id='bio'>{user_info.bio}</div>
						</p>
					</div>
				</Link>

				<div id='post_follow'>
					<Link id='button' to='/my_profile'>
						{user_info.post_number}
						<br></br>
						Posts
					</Link>

					<Link
						id='button'
						to={{
							pathname: '/followers',
							state: {
								UserName: user_info.user_name,
							},
						}}
					>
						{user_info.follower_number}
						<br></br>
						Followers
					</Link>

					<Link
						id='button'
						to={{
							pathname: '/followings',
							state: {
								UserName: user_info.user_name,
							},
						}}
					>
						{user_info.following_number}
						<br></br>
						Following
					</Link>
				</div>
			</section>

			<section id='main_container2'>
				<Link class='icon' to={'/liked'}>
					<HeartFill
						id='browse_history_icon'
						size={30}
						color='white'
					/>
					<p id='liked'>Liked</p>
				</Link>
				<Link class='icon' to={'/my_comment_history'}>
					<TextParagraph
						id='browse_history_icon'
						size={30}
						color='white'
					/>
					<p id='commented'>Commented</p>
				</Link>

				<Link class='icon' to={'/browse_history'}>
					<ClockHistory
						id='browse_history_icon'
						size={30}
						color='white'
					/>
					<p id='browse_history'>Browse History</p>
				</Link>
			</section>

			<section>
				<h1>Connected Social Media</h1>

				<div id='main_container3'>
					{linked_social_media.map((item, i) => (
						<Linked_platform_connect key={item.id} details={item} />
					))}
				</div>
				<h1>Unconnected Social Media</h1>
				<div id='main_container3'>
					{unconnected_social_media.map((item, i) => (
						<Unconnected_social_media
							key={item.id}
							details={item}
						/>
					))}
				</div>
			</section>
		</div>
	)
}

export default Me
