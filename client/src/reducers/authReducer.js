const authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_LOGIN':
			return action.data

		case 'SET_LOGOUT':
			return {}

		default:
			return state
	}
}

export default authReducer
