import React from 'react'
import {preload} from 'react-isomorphic-render/redux'
import {connect} from 'react-redux'
import List from '../../components/Polls/List'

@preload(({dispatch, fetchData})=>dispatch(fetchData('/polls', 'pollsList')))
@connect(state=>({
    pollsList: state.fetchData.pollsList.response
}))
export default class Polls extends React.Component{
    render(){
        const {pollsList} = this.props
        return (
            <List items={pollsList}/>
        )
    }
}