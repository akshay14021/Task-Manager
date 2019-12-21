import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { setProfile, setLogin, startSetLogout } from '../actions/auth'
import { history } from '../routers/AppRouter'
import { startResetTasks } from '../actions/tasks'

class Form extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.user.name || '',
			email: this.props.user.email || '',
			password: this.props.user.password || '',
			age: this.props.user.age || 0,
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
			'http://localhost:5000/users/me',
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
		).then(response => {
			this.props.dispatch(setProfile(response.data))
			history.push('/users/me')
		})
	}

	handleUserRegistration = e => {
		e.preventDefault()
		Axios.post('http://localhost:5000/users', {
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
				this.setState({ message: error.response.data })
			})
	}

	handleUserDelete = e => {
		e.preventDefault()
		Axios.delete('http://localhost:5000/users/me', {
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
			<form onSubmit={e => this.onSubmitHandler(e)}>
				{this.props.token ? (
					<h1>Edit Profile</h1>
				) : (
					<h1>Create Account</h1>
				)}
				<input
					type='text'
					value={this.state.name}
					onChange={this.onNameChange}
					placeholder='name'
				/>
				<input
					type='text'
					value={this.state.email}
					onChange={this.onEmailChange}
					placeholder='email'
				/>
				<input
					type='password'
					value={this.state.password}
					onChange={this.onPasswordChange}
					password='password'
				/>
				<input
					type='text'
					value={this.state.age}
					onChange={this.onAgeChange}
					placeholder='age'
				/>
				{this.props.token ? (
					<div>
						<button>Update</button>
						<button onClick={e => this.handleUserDelete(e)}>
							Delete
						</button>
					</div>
				) : (
					<div>
						<p>{this.state.message}</p>
						<button onClick={e => this.handleUserRegistration(e)}>
							Register
						</button>
						<button>
							<Link to='/'>Login</Link>
						</button>
					</div>
				)}
			</form>
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
