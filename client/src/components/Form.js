import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { setProfile, setLogin, startSetLogout } from '../actions/auth'
import { history } from '../routers/AppRouter'
import { startResetTasks } from '../actions/tasks'
import FadeIn from 'react-fade-in/lib/FadeIn'

class Form extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.user.name || '',
			email: this.props.user.email || '',
			password: this.props.user.password || '',
			age: this.props.user.age,
			message: ''
		}
	}

	onNameChange = e => {
		const name = e.target.value
		this.setState({ name })
	}

	onEmailChange = e => {
		const email = e.target.value
		this.setState({ email })
	}

	onPasswordChange = e => {
		const password = e.target.value
		this.setState({ password })
	}

	onAgeChange = e => {
		const age = e.target.value
		this.setState({ age })
	}

	onSubmitHandler = e => {
		e.preventDefault()
		Axios.patch(
			'/users/me',
			{
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				age: this.state.age
			},
			{
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			}
		)
			.then(response => {
				this.props.dispatch(setProfile(response.data))
				history.push('/users/me')
			})
			.catch(error => {
				this.setState({
					message:
						'Please provide all details correctly, (make sure password does not have "password")'
				})
			})
	}

	handleUserRegistration = e => {
		e.preventDefault()
		Axios.post('/users', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			age: this.state.age
		})
			.then(response => {
				this.props.dispatch(setLogin(response.data))
				this.props.dispatch(setProfile(response.data.user))
				sessionStorage.setItem('auth', JSON.stringify(response.data))
				history.push('/dashboard')
			})
			.catch(error => {
				this.setState({
					message: 'Please provide all the details correctly'
				})
			})
	}

	handleUserDelete = e => {
		e.preventDefault()
		Axios.delete('/users/me', {
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		}).then(response => {
			this.props.dispatch(startSetLogout())
			this.props.dispatch(startResetTasks())
			sessionStorage.removeItem('auth')
			history.push('/')
		})
	}

	render() {
		return (
			<FadeIn>
				<div className='login-content'>
					<div className='login-content__data'>
						<div className='login-content__header'>Task App</div>
						<span className='login-content__subtitle'>
							Keep your tasks at one place
						</span>
					</div>
					<div className='login-content__form'>
						<form
							className='form'
							onSubmit={e => this.onSubmitHandler(e)}
						>
							{this.props.token ? (
								<h1 className='login-content__form__header'>
									Edit Profile
								</h1>
							) : (
								<h1 className='login-content__form__header'>
									Create Account
								</h1>
							)}
							<input
								type='text'
								value={this.state.name}
								onChange={this.onNameChange}
								placeholder='Name'
								className='text-input'
							/>

							<div>
								<hr />
							</div>

							<input
								type='text'
								value={this.state.email}
								onChange={this.onEmailChange}
								placeholder='Email'
								className='text-input'
							/>

							<div>
								<hr />
							</div>

							<input
								type='password'
								value={this.state.password}
								onChange={this.onPasswordChange}
								placeholder='Password'
								className='text-input'
							/>

							<div>
								<hr />
							</div>

							<input
								type='text'
								value={this.state.age}
								onChange={this.onAgeChange}
								placeholder='Age'
								className='text-input'
							/>

							<div>
								<hr />
							</div>

							{this.props.token ? (
								<div>
									<span className='form__error--register'>
										{this.state.message}
									</span>
									<div className='form-buttons'>
										<button className='button button--update'>
											Update
										</button>
										<button
											className='button button--delete'
											onClick={e =>
												this.handleUserDelete(e)
											}
										>
											Delete
										</button>
									</div>
								</div>
							) : (
								<div>
									<span className='form__error--register'>
										{this.state.message}
									</span>
									<div className='form-buttons'>
										<button
											className='button button--register'
											onClick={e =>
												this.handleUserRegistration(e)
											}
										>
											Register
										</button>
										<button className='button button--login'>
											<Link className='link' to='/'>
												Login
											</Link>
										</button>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			</FadeIn>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: state.profile,
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(Form)
