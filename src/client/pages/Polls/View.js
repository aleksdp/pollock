import React from 'react'
import {connect} from 'react-redux'
import {preload, goto} from 'react-isomorphic-render/redux'
import View from '../../components/Polls/View'
import {fetchData} from 'react-security-fetcher'
import {bindActionCreators} from 'redux'

@preload(({dispatch, fetchData, parameters})=>dispatch(fetchData(`/polls/${parameters.id}`, 'pollView', 'GET', {params: {
    filter: JSON.stringify({
        include: 'image'
    })
}})))
@connect(state=>({
    pollView: state.fetchData.pollView.response
}), dispatch=>({
    actions: bindActionCreators({goto}, dispatch)
}))
export default class ViewPage extends React.Component{
    handleDelete = (id) => async () => {
        await fetchData(`/polls/${id}`, 'DELETE')
        this.props.actions.goto('/polls')
    }
    render(){
        const {props: {pollView}, handleDelete} = this
        return (
            <View item={pollView} actions={{handleDelete}} />
        )
    }
}