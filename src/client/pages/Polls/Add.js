import React from 'react'
import PollForm from '../../components/Polls/Form'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import {fetchData} from 'react-security-fetcher'
import {goto} from 'react-isomorphic-render/redux'
import {bindActionCreators} from 'redux'

const selector = formValueSelector('poll')



@connect(state=>({
    image: selector(state, 'image')
}), dispatch=>({
    actions: bindActionCreators({goto}, dispatch)
}))
export default class AddPage extends React.Component{
    render(){
        return (
            <div className='row'>
                <div className='col-sm-4'>
                    <PollForm onSubmit={async ({image = {}, ...form}) => {
                        return await fetchData('/polls', 'POST', {
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