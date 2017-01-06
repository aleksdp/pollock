import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout'
import App from './components/App'
import NotFound from './pages/not found'
import PollsAdd from './pages/Polls/Add'
import Polls from './pages/Polls'
import PollsView from './pages/Polls/View'
import PollsEdit from './pages/Polls/Edit'

export default function() // ({ dispatch, getState })
{
	return(
		<div>
			<Route component={Layout}>
				<Route path='/' component={App}>
					<Route path='polls'>
						<IndexRoute component={Polls}/>
						<Route path='add' component={PollsAdd}/>
						<Route path=':id/edit' component={PollsEdit}/>
						<Route path=':id' component={PollsView}/>
					</Route>
					<Route path='*' component={NotFound}/>
				</Route>
			</Route>
		</div>
	)
}
