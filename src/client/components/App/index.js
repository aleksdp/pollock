import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'



export default class App extends React.Component{
    render(){
        return (
            <div>
                <Navigation/>
                <section id='intro' className='intro-section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }
}