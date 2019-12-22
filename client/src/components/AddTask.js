import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { startSetTasks } from '../actions/tasks'

class AddTask extends Component {
	state = {
		description: '',
		completed: false,
		error: ''
	}

	onDescriptionChange = e => {
		const description = e.target.value
		this.setState({ description })
	}

	onSubmitHandler = e => {
		e.preventDefault()
		if (this.state.description) {
			Axios.post(
				'/api/tasks',
				{
					description: this.state.description
				},
				{
					headers: {
						Authorization: 'Bearer ' + this.props.token
					}
				}
			).then(response => {
				Axios.get('/api/tasks', {
					headers: {
						Authorization: 'Bearer ' + this.props.token
					}
				}).then(response => {
					this.props.dispatch(startSetTasks(response.data))
					history.push('/dashboard')
				})
			})
			this.setState({ description: '' })
			this.setState({ error: '' })
		} else {
			this.setState({ error: 'Please type description' })
		}
	}

	render() {
		return (
			<div className='form-add'>
				<div className='content-container'>
					{this.state.error && (
						<p className='form__error form__error--addtask'>
							{this.state.error}
						</p>
					)}
					<form
						className='form form--addtask'
						onSubmit={e => this.onSubmitHandler(e)}
					>
						<input
							type='text'
							placeholder='Add Task '
							value={this.state.description}
							onChange={this.onDescriptionChange}
							className='text-input text-input--add'
						/>
						<button className='button button--addtask'>
							Add Task
						</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(AddTask)
