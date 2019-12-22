import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.scss'
import configurStore from './store/configureStore'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import { startSetLogout, setLogin, setProfile } from './actions/auth'
import { startSetTasks } from './actions/tasks'

import * as serviceWorker from './serviceWorker'
import Axios from 'axios'

const store = configurStore()

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

let appRendered = true
const renderApp = () => {
	if (appRendered) {
		ReactDOM.render(jsx, document.getElementById('root'))
		appRendered = false
	}
}

if (JSON.parse(sessionStorage.getItem('auth'))) {
	store.dispatch(setLogin(JSON.parse(sessionStorage.getItem('auth'))))
	Axios.get('/users/me', {
		headers: {
			Authorization:
				'Bearer ' + JSON.parse(sessionStorage.getItem('auth')).token
		}
	}).then(response => {
		store.dispatch(setProfile(response.data))
		Axios.get('/tasks', {
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(sessionStorage.getItem('auth')).token
			}
		}).then(response => {
			store.dispatch(startSetTasks(response.data))
			renderApp()
		})
	})
	if (history.location.pathname === '/') {
		history.push('/dashboard')
	}
} else {
	store.dispatch(startSetLogout())
	renderApp()
	if (history.location.pathname === '/users') {
		history.push('/users')
	} else {
		history.push('/')
	}
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()