import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserProfile = props => {
	return (
		<div>
			<Link to='/dashboard'>Dashboard</Link>
			<p>{props.userData.name}</p>
			<p>{props.userData.email}</p>
			<p>{props.userData.age}</p>
			<Link to='/edit'>Edit Profile</Link>
		</div>
	)
}

const mapStateToProps = (state, props) => {
	return {
		userData: state.profile
	}
}

export default connect(mapStateToProps)(UserProfile)
