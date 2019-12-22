import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskListItem from './TaskListItem'
import Axios from 'axios'
import { startDeleteTask, startSetTasks } from '../actions/tasks'
import { history } from '../routers/AppRouter'

class TaskList extends Component {
	handleTaskDelete = id => {
		Axios.delete(`/api/tasks/${id}`, {
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		}).then(response => {
			this.props.dispatch(startDeleteTask(id))
			Axios.get('/api/tasks', {
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			}).then(response => {
				this.props.dispatch(startSetTasks(response.data))
				history.push('/dashboard')
			})
		})
	}

	handleTaskUpdate = (id, value) => {
		Axios.patch(
			`/api/tasks/${id}`,
			{
				completed: value
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
	}

	render() {
		return (
			<div>
				<div className='content-container'>
					<div className='widget'>
						<h3 className='widget__header'>Your task list</h3>
						<h1 className='widget__subtitle'>
							Click task description to mark completed
						</h1>
					</div>
					<div>
						<hr className='hr' />
					</div>
					{this.props.tasks.length === 0 ? (
						<div className='no-task-message'>
							Add task to get started!
						</div>
					) : (
						this.props.tasks.map(task => {
							return (
								<TaskListItem
									key={task._id}
									tasks={task}
									handleTaskDelete={e =>
										this.handleTaskDelete(task._id)
									}
									handleTaskUpdate={e =>
										this.handleTaskUpdate(
											task._id,
											!task.completed
										)
									}
								/>
							)
						})
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		tasks: state.tasks,
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(TaskList)
