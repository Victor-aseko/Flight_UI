import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/authSlice'
import './auth.css'

function RegistrationForm(prp) {
	const [firstname, setFirstname] = useState(null)
	const [lastname, setLastname] = useState(null)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)

	const [msg, setMsg] = useState('')

	const dispatch = useDispatch()
	const navigation = useNavigate()

	const handleInputChange = (e) => {
		const { id, value } = e.target

		if (id === 'firstname') {
			setFirstname(value)
		}
		if (id === 'lastname') {
			setLastname(value)
		}
		if (id === 'email') {
			setEmail(value)
		}
		if (id === 'password') {
			setPassword(value)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const res = await fetch(
			`https://flight-booking-server-3zln.vercel.app/user/signup`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					firstName: firstname,
					lastName: lastname,
					password
				})
			}
		)

		const data = await res.json()
		if (data.message) {
			dispatch(authActions.login({ email }))
			return navigation('/')
		}
		setMsg(data.error)
	}
	console.log(
		'==========================MESSAGE======================================'
	)
	console.log(msg)

	const focusChangeHandler = () => {
		setMsg('')
	}

	return (
		<div className="auth-container ">
			<div className="form-signup" id="login-form">
				<h1>Sign up</h1>
				<form className="login_form">
					<label className="auth_label">First Name</label>
					<input
						type="text"
						style={{ width: '80%', padding: '6px', borderRadius: "0.5rem" }}
						className="auth_input"
						id="firstname"
						name="firstname"
						value={firstname}
						onChange={(e) => handleInputChange(e)}
						onFocus={focusChangeHandler}
						required
					/>
					<label className="auth_label">Last Name</label>
					<input
						type="text"
						style={{ width: '80%', padding: '6px', borderRadius: "0.5rem" }}
						className="auth_input"
						id="lastname"
						name="lastname"
						value={lastname}
						onChange={(e) => handleInputChange(e)}
						onFocus={focusChangeHandler}
						required
					/>
					<label className="auth_label">Email</label>
					<input
						type="email"
						className="auth_input"
						name="email"
						id="email"
						value={email}
						onChange={(e) => handleInputChange(e)}
						onFocus={focusChangeHandler}
						required
					/>

					<label className="auth_label">Password</label>
					<input
						type="password"
						className="auth_input"
						name="password"
						id="password"
						value={password}
						onChange={(e) => handleInputChange(e)}
						onFocus={focusChangeHandler}
						required
					/>
					<p style={{ color: 'red' }}>{msg}</p>
					<button type="submit" className="auth_button" onClick={handleSubmit}>
						Sign up
					</button>
				</form>
				<p className="auth_p">
					Already have an account? <Link to={'/Login'}> Login</Link>
				</p>
			</div>
		</div>
	)
}

export default RegistrationForm
