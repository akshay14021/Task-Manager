export const setLogin = data => {
	return {
		type: 'SET_LOGIN',
		data
	}
}

export const setProfile = data => {
	return {
		type: 'SET_PROFILE',
		data
	}
}

export const resetProfile = () => {
	return {
		type: 'RESET_PROFILE'
	}
}

export const setLogout = () => {
	return {
		type: 'SET_LOGOUT'
	}
}

export const startSetLogout = () => {
	return (dispatch, getState) => {
		dispatch(setLogout())
		dispatch(resetProfile())
	}
}
