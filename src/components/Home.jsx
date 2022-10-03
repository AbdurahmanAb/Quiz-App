 import React, { Fragment } from 'react'
import {Helmet} from 'react-helmet'
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <Fragment>
    <Helmet><title>Quiz App- Home</title></Helmet>
     <div id='home'>
     <section className='container'>
      <div>
        <span className="fas fa-graduation-cap" style={{'fontSize':'8rem', 'color':'orange', textAlign:'center'}}></span>
      </div>
      <h1 style={{'margin':'9rem'}}>Welcome To Quiz App</h1>
      <div className='play-button'>
         <ul>
            <li><Link className='play-button-link' to="/play/instruction">Take Quiz</Link></li>
         </ul>
      </div>
     {/* <div className='Auth-container'>
      <Link to="login" className='auth-buttons' id='login'>Login</Link>
      <Link to="signup" className='auth-buttons' id='signup'>Sign Up</Link>
      </div>*/}
      </section>
     </div>
  </Fragment>

  )
}

export default Home;