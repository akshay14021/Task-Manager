import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'
import FadeIn from 'react-fade-in/lib/FadeIn'
import Copyright from './Copyright'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			auth: this.props.userData
		}
	}
	render() {
		return (
			<FadeIn delay={200}>
				<Header />
				<TaskList />
				<AddTask />
			</FadeIn>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		userData: state.auth
	}
}

export default connect(mapStateToProps)(Dashboard)
