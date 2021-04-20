import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Repost.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Edit = (props) => {
	let history = useHistory()
	const goTOPreviousPath = () => {
		history.goBack()
	}
	const [show, setShow] = useState(false)

	const _setShow = () => {
		console.log(show)
		setShow(!show)
	}

	const [old_post_text, setOld_post_text] = useState('')
	const [old_post_by, setOld_post_by] = useState('')
	const [old_post_img, setOld_post_img] = useState('')

	const [send, setSend] = useState(false)
	const [post_text, setPost_text] = useState('')

	useEffect(() => {
		axios
			.get('/get_repost_inner', {
				params: {
					// post_text: post_text,
				},
			})
			.then((response) => {
				setOld_post_text(response.data.old_post_text)
				setOld_post_by(response.data.old_post_by)
				setOld_post_img(response.data.old_post_img)
			})
			.catch((err) => {
				console.error(err)
			})
	}, []) // only run it once!

	const goTOPreviousPath2 = (e) => {
		setSend(!send)
		setPost_text('my post text')
		console.log('send:', send)
		console.log('post_text:', post_text)
		document.getElementById('myTextarea').value = post_text
		console.log(post_text)

		if (post_text !== '') {
			axios.get('/get_edit', {
				//send along the post_text user typed
				params: {
					post_text: `${post_text} @${old_post_by}:${old_post_text}`,
					old_post_img: old_post_img,
				},
			})
			history.goBack()
			setTimeout(() => {
				window.location.href = window.location.href
			}, 100)
		} else {
			alert('You need to write some text')
			e.preventDefault()
		}
	}

	return (
		<div className='repost'>
			<header>
				<Link onClick={goTOPreviousPath}>
					<button>back</button>
				</Link>
				<h2>New Repost</h2>
				<button
					onClick={(e) => {
						goTOPreviousPath2(e)
					}}
					id='send_button'
				>
					send
				</button>
			</header>

			<section className='edit-wrap'>
				<textarea id='myTextarea' placeholder="what's on your mind?" onInput={(e) => setPost_text(e.target.value)} />

				<div className='card'>
					<img className='img' src={old_post_img} alt='' />
					<div className='text'>
						<strong>@{old_post_by}</strong>
						<p>{old_post_text} </p>
					</div>
				</div>

				<div className='post'>
					<span onClick={_setShow}>Post to ▼ </span>
					<div className='post-checkbox' style={{ opacity: show ? 1 : 0 }}>
						<label>
							<input name='post' type='checkbox' />
							Platform A{' '}
						</label>
						<label>
							<input name='post' type='checkbox' />
							Platform B
						</label>
						<label>
							<input name='post' type='checkbox' />
							Platform C
						</label>
						<label>
							<input name='post' type='checkbox' />
							Platform D
						</label>
					</div>
				</div>

				<div className='checkbox'>
					<input type='checkbox' />
					<span>Post as Public</span>
				</div>
			</section>
		</div>
	)
}

export default Edit
