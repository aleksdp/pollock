import React from 'react'
import moment from 'moment'
import {Link} from 'react-router'


export default class View extends React.Component{
    render(){
        const {
            item: {
                description,
                title,
                startDate,
                endDate,
                id},
            actions: {
                    handleDelete
            }
        } = this.props
        return (
            <div>
                <h3>{title}</h3>
                <p>
                    {description}
                </p>
                <h4> #{id} | {moment(startDate).format('LLL')} - {moment(endDate).format('LLL')}</h4>
                {/*<h4>by <pollowner/></h4>*/}
                <Link to={`/polls/${id}/edit`}>Edit</Link><br/>
                <button onClick={handleDelete(id)}>
                    Delete poll
                </button>
            </div>
        )
    }
}
