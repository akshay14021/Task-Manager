const defaultTaskReducerState = []

const tasksReducer = (state = defaultTaskReducerState, action) => {
	switch (action.type) {
		case 'SET_TASKS':
			return action.tasks

		case 'RESET_TASKS':
			return []

		case 'DELETE_TASK':
			return state.filter(task => {
				if (task.id === action.id) {
					return task.id !== action.id
				} else {
					return task
				}
			})

		case 'EDIT_TASK':
			return state.map(task => {
				if (task.id === action.id) {
					return { ...task, ...action.updates }
				} else {
					return task
				}
			})

		default:
			return state
	}
}

export default tasksReducer
