const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_PROFILE':
			return action.data

		case 'RESET_PROFILE':
			return {}

		default:
			return state
	}
}

export default profileReducer
