import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in/lib/FadeIn'

const UserProfile = props => {
	return (
		<FadeIn>
			<div className='login-content'>
				<div className='login-content__data'>
					<div className='login-content__header'>Task App</div>
					<span className='login-content__subtitle'>
						Keep your tasks at one place
					</span>
				</div>
			</div>
			<div className='profile'>
				<div className='content-container container'>
					<div className='profile-content'>
						<div className='profile-header'>
							<p className='profile-header__h1'>Profile</p>
							<p className='dashboard'>
								<Link
									className='profile-header__h2'
									to='/dashboard'
								>
									Dashboard
								</Link>
							</p>
						</div>
						<div>
							<hr />
						</div>
						<div className='profile__details'>
							<h1 className='profile__name'>
								{props.userData.name}
							</h1>
							<h2 className='profile__email'>
								{props.userData.email}
							</h2>
							<button className='button button--edit'>
								<Link className='link' to='/edit'>
									Edit Profile
								</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
		</FadeIn>
	)
}

const mapStateToProps = (state, props) => {
	return {
		userData: state.profile
	}
}

export default connect(mapStateToProps)(UserProfile)
