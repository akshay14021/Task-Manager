import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../routers/AppRouter'
import { setLogin, setProfile } from '../actions/auth'
import { startSetTasks } from '../actions/tasks'
import axios from 'axios'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			message: ''
		}
	}

	onEmailChange = e => {
		const email = e.target.value
		this.setState({ email })
	}

	onPasswordChange = e => {
		const password = e.target.value
		this.setState({ password })
	}

	onSubmitHandler = (e, auth) => {
		e.preventDefault()
		if (this.state.email && this.state.password) {
			axios
				.post('/users/login', {
					email: this.state.email,
					password: this.state.password
				})
				.then(response => {
					this.props.dispatch(setLogin(response.data))
					this.props.dispatch(setProfile(response.data.user))
					sessionStorage.setItem(
						'auth',
						JSON.stringify(response.data)
					)
					axios
						.get('/tasks', {
							headers: {
								Authorization:
									'Bearer ' +
									JSON.parse(sessionStorage.getItem('auth'))
										.token
							}
						})
						.then(response => {
							this.props.dispatch(startSetTasks(response.data))
							history.push('/dashboard')
						})
					history.push('/dashboard')
				})
				.catch(error => {
					this.setState({ message: error.response.data })
				})
		}
	}

	render() {
		return (
			<div className='login-content'>
				<div className='login-content__data'>
					<div className='login-content__header'>Task App</div>
					<span className='login-content__subtitle'>
						Keep your tasks at one place
					</span>
				</div>
				<div className='login-content__form'>
					<h1 className='login-content__form__header'>Login</h1>
					<span className='subtitle'>Dont have an account?</span>
					<Link className='subtitle__create' to='/users'>
						<span>Create account</span>
					</Link>
					<form
						className='form'
						onSubmit={(e, auth) => this.onSubmitHandler(e, auth)}
					>
						<input
							type='text'
							placeholder='Email Address'
							value={this.state.email}
							onChange={this.onEmailChange}
							className='text-input'
						/>
						<div>
							<hr />
						</div>
						<input
							type='password'
							placeholder='Password'
							value={this.state.password}
							onChange={this.onPasswordChange}
							className='text-input'
						/>
						<div>
							<hr />
						</div>
						{this.state.message ? (
							<div className='form__error'>
								{this.state.message}
							</div>
						) : null}
						<button className='button'>Sign In</button>
					</form>
				</div>
			</div>
		)
	}
}

export default connect()(Login)
