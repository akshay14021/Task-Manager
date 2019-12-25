import React, { createRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Flip } from 'react-toastify'
import Reward from 'react-rewards'

class TaskListItem extends React.Component {
	constructor(props) {
		super(props)
		this.reward = createRef()
	}

	render() {
		const notifyCompleted = () => toast.success('Task Completed')
		const notifyUnCompleted = () => toast.info('Task Marked Uncomplete')
		const notifyTaskDeleted = () => toast.warn('Task deleted')
		return (
			<div>
				<Reward
					ref={ref => {
						this.reward = ref
					}}
					type='confetti'
				>
					<div className='option'>
						<button
							className={
								this.props.tasks.completed
									? `option__title option__title--completed`
									: `option__title`
							}
							onClick={
								!this.props.tasks.completed
									? () => {
											this.props.handleTaskUpdate()
											notifyCompleted()
											this.reward.rewardMe()
									  }
									: () => {
											this.props.handleTaskUpdate()
											notifyUnCompleted()
											this.reward.punishMe()
									  }
							}
						>
							{this.props.tasks.description}
						</button>
						<button
							className='button--removetask'
							onClick={() => {
								this.props.handleTaskDelete()
								notifyTaskDeleted()
							}}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
					</div>
				</Reward>
				<ToastContainer transition={Flip} />
			</div>
		)
	}
}

export default TaskListItem
