import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import options from '../assets/img/options.PNG'
import answer from '../assets/img/answer.png'
import hints from '../assets/img/hints.PNG'
import fiftyFifty from '../assets/img/fiftyFifty.PNG'
const Instructions = () =>  (
    <Fragment>
        <Helmet><title>Quiz- Instructions</title></Helmet>
        <div className='instruction-container'>
            <h1 className='heading'>how to play the game</h1>
            <p className='text'>ensure that you have read this guide from start to finish </p>
            <ul className='instruction-list'>
                <li>the game has duration of 15 minutes end as soon as as the time elapses </li>
                <li>each  quiz have 15 questions</li>
                <li>each quiz have  4 options</li>
               <li> <img src={options} alt='option image'/></li>
               <li>select the option</li>
               <li> <img src={answer} alt='option image'/></li>
               <li>each game have to life line:
                 <ul>
                    <li>fiftyFifty</li>
                    <li>hints</li>
                 </ul>
               </li>
               <li>selcting fiftyFifty lifeline by clicking <span className='fa fa-eye eye'></span> and it will remove two wrong answer</li>
               <li> <img src={fiftyFifty} alt='option image'/></li>
               <li>selecting  hint by clicking <span className='fa fa-lightbulb light'></span> and it will remove one wrong answer and there will be one right and to wrong answers</li>
               <li><img src={hints}/></li>
               <li>feel free to start or quit the game</li>
               <li>the timer starts as soons as the game loads</li>
            </ul>
            <div className='instruction-links'>
            <Link to='/' className='back-link'>Back To Home</Link>
            <Link to='/play/quiz' className='go-quiz'>Start The Quiz</Link>
              </div>            
            </div>
    </Fragment>
  )


export default Instructions