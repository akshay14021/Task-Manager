import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			auth: this.props.userData
		}
	}
	render() {
		return (
			<div>
				<Header />
				<TaskList />
				<AddTask />
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		userData: state.auth
	}
}

export default connect(mapStateToProps)(Dashboard)
