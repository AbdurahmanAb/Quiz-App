import React from 'react'
import { useLocation,Link } from 'react-router-dom'


const Result= ()=> {
const location = useLocation();
const score = Math.ceil((location.state.stats.correctAnswer/location.state.stats.tried)*100)
let text;
if(score>90){
  text = 'You Are Absolutely Genious'
}else if(score>80){
  text = 'Excellent Result Dude'
}else if(score>70){
  text = 'Very Good but, You can Do Better!!'
}
else if(score>60){
  text = 'Not Bad Amigo'
}
else if(score>50){
  text = 'Pass'
}else{
  text='Better Luck Next Time'
}


return (
    <React.Fragment>
    { location.state !== null? <div >
     <div className='Result-heading'>
          <h1><i className="fa fa-check-circle check"></i><span>Congratulation You Have Made it</span></h1>
     </div>
     <div className='stats-details'>
      <div className='stats-detail-heading'>
         <h3>{text}</h3>
         <h1>Your Score: {score}%</h1>
      </div>
      <div className='stats-detail-1'>
   <h4><span className='stats-left'>Total Number of question</span>
  <span className='right'>{location.state.stats.NoOfquestion}</span></h4>
   <h4><span className='stats-left'>Tried Question</span>
   <span className='right'>{location.state.stats.tried}</span></h4>
   <h4><span className='stats-left'>correctAnswer</span>
  <span className='right'>{location.state.stats.correctAnswer}</span></h4>
   <h4><span className='stats-left'>wrong Answer</span>
   <span className='right'>{location.state.stats.wrongAnswer}</span></h4>
   <h4><span className='stats-left'>Number of fifty used</span>
   <span className='right'>{location.state.stats.NoFifty}</span></h4>
   <h4><span className='stats-left'>Number of Hints used</span>
   <span className='right'>{location.state.stats.NoHint}</span></h4>
   </div>
     </div>
     <div className='buttons'> 
      <Link to='/play/quiz'>Play Again</Link>
      <Link to='/'>Back Home</Link>
     </div>
    </div>
      :<div className='no-stats'>
      <h1>no status available</h1>
      </div>}

</React.Fragment>
  )
}

export default Result