import React from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/styles.scss'
import configurStore from './store/configureStore'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import Loading from './components/Loading'
import { startSetLogout, setLogin, setProfile } from './actions/auth'
import { startSetTasks } from './actions/tasks'
import * as serviceWorker from './serviceWorker'
import Axios from 'axios'

const store = configurStore()
toast.configure()

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

ReactDOM.render(<Loading />, document.getElementById('root'))

if (JSON.parse(sessionStorage.getItem('auth'))) {
	store.dispatch(setLogin(JSON.parse(sessionStorage.getItem('auth'))))
	Axios.get('/users/me', {
		headers: {
			Authorization:
				'Bearer ' + JSON.parse(sessionStorage.getItem('auth')).token
		}
	})
		.then(response => {
			store.dispatch(setProfile(response.data))
			Axios.get('/tasks', {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(sessionStorage.getItem('auth')).token
				}
			}).then(response => {
				store.dispatch(startSetTasks(response.data))
				setTimeout(() => {
					renderApp()
				}, 3000)
			})
		})
		.catch(error => {
			history.push('/')
		})
	if (history.location.pathname === '/') {
		history.push('/dashboard')
	}
} else {
	store.dispatch(startSetLogout())
	setTimeout(() => {
		renderApp()
	}, 3000)
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
