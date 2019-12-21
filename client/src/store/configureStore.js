import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import tasksReducer from '../reducers/tasksReducer'
import authReducer from '../reducers/authReducer'
import profileReducer from '../reducers/profileReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
	const store = createStore(
		combineReducers({
			tasks: tasksReducer,
			auth: authReducer,
			profile: profileReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

	return store
}
