import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [loginData, setLoginData] = useState({ email: '', password: '' })
	const [msg, setMsg] = useState('')

	const dispatch = useDispatch()
	const navigation = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Perform login logic here
		const res = await fetch(
			`https://flight-booking-server-3zln.vercel.app/user/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: loginData.email,
					password: loginData.password
				})
			}
		)

		const data = await res.json()
		if (data.message) {
			dispatch(authActions.login({ email: loginData.email }))
			return navigation('/')
		}
		setMsg(data.error)
	}
	const focusChangeHandler = () => {
		setMsg('')
	}

	const handleChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		})
	}
	return (
		<div className="auth-container ">
			<div className="form-signup" id="login-form">
				<h1>Login</h1>
				<form className="login_form">
					<label className="auth_label">Email</label>
					<input
						type="email"
						className="auth_input"
						name="email"
						value={loginData?.email}
						onChange={(e) => handleChange(e)}
						onFocus={focusChangeHandler}
						required
					/>
					<label className="auth_label">Password</label>
					<input
						type="password"
						className="auth_input"
						name="password"
						value={loginData?.password}
						onChange={(e) => handleChange(e)}
						onFocus={focusChangeHandler}
						required
					/>
					<p style={{ color: 'red' }}>{msg}</p>
					<button type="submit" className="auth_button" onClick={handleSubmit}>
						Login
					</button>
				</form>
				<p className="auth_p">
					Don't have an account? <Link to={'/SignUp'}> Sign up</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginForm
