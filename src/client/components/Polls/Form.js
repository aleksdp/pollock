import React from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form'
import ReactDateTime from 'react-datetime'

@reduxForm({
    form: 'poll'
})
export default class Poll extends React.Component{
    render(){
        const {handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-sm-12'>

                                <label htmlFor='title'>Title</label>
                                <Field component='input' type='text' className='form-control' name='title' id='title' required='required' />
                                <br/>

                                <label htmlFor='description'>Description</label><br />
                                <Field component='textarea' id='description' name='description' className='form-control'/>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-12'>
                                <label htmlFor='start'>Start</label><br />
                                <div className='input-group date'>
                                    <Field component={DateTime} name='startDate'/>
                                        <span className='input-group-addon'>
                                            <i className='glyphicon glyphicon-th'/>
                                        </span>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-12'>
                                <label htmlFor='end'>End</label><br />
                                <div className='input-group date'>
                                    <Field component={DateTime} name='endDate'/>
                                    <span className='input-group-addon'>
                                            <i className='glyphicon glyphicon-th'/>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <FieldArray name='answers' component={answers}/>


                        <div className='row'>
                            <div className='col-sm-12'>
                                <label >Image</label><br />
                                <div className='input-group'>
                                    <span className='input-group-btn'>
                                        <span className='btn btn-primary btn-file'>
                                            Browse… <Field component={require('./Loader')} name='image'/>
                                        </span>
                                    </span>
                                    <input type='text' className='form-control' readOnly=''/>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12' style={{float:'left'}}>
                                <button type='submit' className='btn btn-primary'>Publish</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        )
    }
}

const DateTime = ({input, className}) => {
    return (
        <ReactDateTime {...input} className={className}/>
    )
}

const answers = ({ fields, meta: { error } }) => (
    <ul style={{listStyleType: 'none'}}>
        <li>
            <button type='button' onClick={() => fields.push()}>Add answer</button>
        </li>
        {fields.map((answer, key) =>
            <li key={key}>
                <Field
                    name={answer}
                    type='text'
                    component='input'/>
                <button
                    type='button'
                    onClick={() => fields.remove(key)}>Remove Answer</button>
            </li>
        )}
        {error && <li className='error'>{error}</li>}
    </ul>
)