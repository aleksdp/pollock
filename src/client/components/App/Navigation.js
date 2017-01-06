import React from 'react'
import {Link} from 'react-router'

export default () =>
<nav className='navbar navbar-default navbar-fixed-top' role='navigation'>
    <div className='container'>
        <div className='navbar-header page-scroll'>
            <Link to='/' className='navbar-brand page-scroll'>
                <img style={{height: '30px', marginTop: '-5px'}} src={require('../../../../assets/images/logo.png')}/>
            </Link>
            <Link to='/' className='navbar-brand brand page-scroll' href='#page-top'> pollock </Link>
        </div>

        <div className='collapse navbar-collapse navbar-ex1-collapse'>
            <ul className='nav navbar-nav pull-right'>
                <li>
                        <Link to='/polls' className='btn btn-menu'><span className='brand glyphicon glyphicon-align-left'/></Link>
                </li>
                <li>
                        <Link to='/polls/add' className='btn btn-menu'><span className='brand glyphicon glyphicon-plus'/></Link>
                </li>

            </ul>
        </div>
    </div>
</nav>