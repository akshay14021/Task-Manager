export const setTasks = tasks => {
	return {
		type: 'SET_TASKS',
		tasks
	}
}

export const startSetTasks = tasks => {
	return dispatch => {
		dispatch(setTasks(tasks))
	}
}

export const resetTasks = () => {
	return {
		type: 'RESET_TASKS'
	}
}

export const startResetTasks = () => {
	return dispatch => {
		dispatch(resetTasks())
	}
}

export const deleteTask = id => {
	return {
		type: 'DELETE_TASK',
		id
	}
}

export const startDeleteTask = id => {
	return dispatch => {
		dispatch(deleteTask(id))
	}
}

export const editTask = (id, updates) => {
	return {
		type: 'EDIT_TASK',
		id,
		updates
	}
}

export const startEditTask = (id, updates) => {
	return dispatch => {
		dispatch(editTask(id, updates))
	}
}
