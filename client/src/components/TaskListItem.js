import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
	ToastContainer,
	toast,
	Slide,
	Zoom,
	Flip,
	Bounce
} from 'react-toastify'

const TaskListItem = props => {
	const notifyCompleted = () => toast.success('Task Completed')
	const notifyUnCompleted = () => toast.info('Task Marked Uncomplete')
	const notifyTaskDeleted = () => toast.warn('Task deleted')

	return (
		<div className='option'>
			<button
				className={
					props.tasks.completed
						? `option__title option__title--completed`
						: `option__title`
				}
				onClick={
					!props.tasks.completed
						? () => {
								props.handleTaskUpdate()
								notifyCompleted()
						  }
						: () => {
								props.handleTaskUpdate()
								notifyUnCompleted()
						  }
				}
			>
				{props.tasks.description}
			</button>
			<ToastContainer transition={Flip} />
			<button
				className='button--removetask'
				onClick={() => {
					props.handleTaskDelete()
					notifyTaskDeleted()
				}}
			>
				<FontAwesomeIcon icon={faTrashAlt} />
			</button>
		</div>
	)
}

export default TaskListItem
