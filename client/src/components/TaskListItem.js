import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TaskListItem = props => {
	return (
		<div className='option'>
			<button
				className={
					props.tasks.completed
						? `option__title option__title--completed`
						: `option__title`
				}
				onClick={props.handleTaskUpdate}
			>
				{props.tasks.description}
			</button>

			<button
				className='button--removetask'
				onClick={props.handleTaskDelete}
			>
				<FontAwesomeIcon icon={faTrashAlt} />
			</button>
		</div>
	)
}

export default TaskListItem
