import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import UserProfile from '../components/UserProfile'
import Form from '../components/Form'

export const history = createHistory()

const AppRouter = props => {
	return (
		<div>
			<Router history={history}>
				<div>
					<Switch>
						<Route path='/' component={Login} exact />
						<Route path='/dashboard' component={Dashboard} />
						<Route path='/profile' component={UserProfile} />
						<Route path='/edit' component={Form} exact />
						<Route path='/users' component={Form} exact />
					</Switch>
				</div>
			</Router>
		</div>
	)
}

export default AppRouter
