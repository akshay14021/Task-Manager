import React from 'react'
import { connect } from 'react-redux'
import { startSetLogout } from '../actions/auth'
import { history } from '../routers/AppRouter'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { startResetTasks } from '../actions/tasks'

class Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			message: ''
		}
	}

	onClickHandler = () => {
		JSON.parse(sessionStorage.getItem('auth'))
		Axios({
			method: 'post',
			url: '/users/logout',
			headers: {
				Authorization: 'Bearer ' + this.props.userData.token
			}
		}).then(response => {
			this.props.dispatch(startSetLogout())
			this.props.dispatch(startResetTasks())
			this.setState({ message: response.data })
			sessionStorage.removeItem('auth')
			history.push('/')
		})
	}

	render() {
		return (
			<header className='header'>
				<div className='content-container'>
					<div className='header-content'>
						<img src='post-it.png' alt='img' />
						<div>
							<h1 className='header__title'>Task App</h1>
							<h2 className='header__subtitle'>
								Keep your tasks at one place
							</h2>
						</div>
						<div className='header-user__content'>
							<Link
								className='subtitle__create user__link'
								to='/profile'
							>
								My profile
							</Link>
							<button
								className='button button--logout'
								onClick={this.onClickHandler}
							>
								<span>Logout</span>
							</button>
						</div>
					</div>
					<div>
						<hr className='hr' />
					</div>
				</div>
			</header>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		userData: JSON.parse(sessionStorage.getItem('auth'))
	}
}

export default connect(mapStateToProps)(Header)
