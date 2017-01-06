import React from 'react'
import {Link} from 'react-router'

export default class List extends React.Component{
    render(){
        const {items} = this.props
        return (
            <div>
                {items.map((item, key)=>(
                    <div className='col-md-6' key={key}>
                        <div className='well'>
                            <Link to={`/polls/${item.id}`}><h2>{item.title}</h2></Link>
                            <h4>{item.description}</h4>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}