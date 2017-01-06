import React from 'react'
import PollForm from '../../components/Polls/Form'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import {fetchData} from 'react-security-fetcher'
import {goto, preload} from 'react-isomorphic-render/redux'
import {bindActionCreators} from 'redux'

const selector = formValueSelector('poll')



@preload(({dispatch, fetchData, parameters})=>dispatch(fetchData(`/polls/${parameters.id}`, 'pollEdit')))
@connect(state=>({
    image: selector(state, 'image'),
    pollEdit: state.fetchData.pollEdit.response
}), dispatch=>({
    actions: bindActionCreators({goto}, dispatch)
}))
export default class EditPage extends React.Component{
    render(){
        return (
            <div className='row'>
                <div className='col-sm-4'>
                    <PollForm initialValues={this.props.pollEdit} onSubmit={async ({image = {}, ...form}) => {
                        return await fetchData(`/polls/${this.props.pollEdit.id}`, 'PUT', {
                            params:{...form, imageId: image.id}
                        })
                    }} onSubmitSuccess={({id})=>{
                        this.props.actions.goto(`/polls/${id}`)
                    }}/>
                </div>
                <div className='col-sm-8'>
                    <a className="img-thumbnail">
                        <img src={this.props.image && this.props.image.url || require('../../../../assets/images/prez2.png')} alt="..."/>
                    </a>
                </div>
            </div>
        )
    }
}