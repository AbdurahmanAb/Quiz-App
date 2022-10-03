import React ,{Component, Fragment, useEffect, useState} from 'react'
import {Helmet} from 'react-helmet'
import question from '../data/questions.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import correctnotificatiom from '../assets/audio/correct-answer .mp3'
import wrongnotify from '../assets/audio/wrong-answer.mp3'
import btnnotify from '../assets/audio/button-sound.mp3'
import isInValid from './isInValid';
import { useNavigate } from "react-router-dom";



const Quizpage = () => {
  const [questions, setQuestions] = useState(question)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [nextQestion, setNextQuestions] = useState('')
  const [prevQuestions, setPrevQuestions] = useState('')
  const [currentQuestionindex, setCurrentQuestionindex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [questionsNo, setQuestionsNo] = useState(0)
  const [Hint, setHint] = useState(5);
  const [fifty, setFifty]= useState({
    used: false,
    have:2
  });
  const [time, setTime] = useState({
    minutes:0,
    seconds:0
  })
  const [stats , setStats] = useState({
    wrongAnswer:0,
    correctAnswer:0,
    tried:0,
    NoOfquestion:0,
    NoFifty:0,
    NoHint:0

  })
  const [prevRandom , setprevRandom] = useState([]);

const next = ()=>{
 if(nextQestion!==undefined){
  setCurrentQuestion(nextQestion)

  setCurrentQuestionindex(currentQuestionindex+1)
  setNextQuestions(question[currentQuestionindex + 2])
  setPrevQuestions(question[currentQuestionindex])
  setQuestionsNo(currentQuestionindex +2 )
  setAnswer(question[currentQuestionindex +1].answer)
  setprevRandom([])
  show()
  
 }else{
  endQuiz()
 }
}
const handleBtn = (e)=>{
  switch(e.target.id){
    case 'prev':
        prev()
        break;
    case 'next':
        document.getElementById('button-sound').play()
        next();
        break
    case 'quit':
      Quit();
      break;
    default:
      break;          
  
  }
}

const prev =()=>{
  if(prevQuestions!==undefined){
    document.getElementById('button-sound').play()
    setCurrentQuestion(prevQuestions)
    if(prevQuestions)
    setCurrentQuestionindex(currentQuestionindex-1)
     setNextQuestions(question[currentQuestionindex])
     setPrevQuestions(question[currentQuestionindex-2])
     setQuestionsNo(currentQuestionindex )
     setAnswer(question[currentQuestionindex -1].answer)
     setprevRandom([])
     show()
    
  }
}

 const handleAnswer = (e)=>{
  if(e.target.innerHTML.toLowerCase() === answer.toLowerCase()){
    toast.success("Success message", {
      position: "top-right",
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      autoClose: 500,
    });
setStats({...stats, correctAnswer:stats.correctAnswer+1, tried:stats.tried+1,  NoFifty:(2-fifty.have), NoHint:(5-Hint)})
document.getElementById('correct-sound').play()
next();
}else{
  toast.error('Wrong Answer!', {
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    autoClose: 500,
});
setStats({...stats, wrongAnswer:stats.wrongAnswer+1,tried:stats.tried+1,  NoFifty:(2-fifty.have), NoHint:(5-Hint)})
document.getElementById('wrong-sound').play()
next()
}
 }


  const display = (question=questions, currentQuestion, nextQestion, prevQuestions)=>{
          if(!isInValid(question)){
            setCurrentQuestion(question[currentQuestionindex])
            setNextQuestions(question[currentQuestionindex + 1])
            setPrevQuestions(question[currentQuestionindex-1])
            setQuestionsNo(currentQuestionindex +1 )
            setAnswer(question[currentQuestionindex].answer)
            setprevRandom([])
            show()
            setStats({...stats, NoOfquestion:question.length})
           startTime()
            
          }
     };

     const startTime =  ()=>{
    const countDown = Date.now() + 184000
   const ab =  setInterval(()=>{
      const now = new Date();
      const distance = countDown-now;
      const minutes = Math.floor((distance % (1000 *60*60))/(1000*60));
      const seconds = Math.floor((distance % (1000 *60))/(1000));
 if(distance<0){
 
 
  clearInterval(ab);
  endQuiz();
   setTime({minutes:0, seconds:0})
   

 }else{
  setTime({minutes:minutes, seconds:seconds})
 }
    }, 1000)
     }
  const history = useNavigate()
  const Quit = ()=>{
  document.getElementById('button-sound').play()
  if(window.confirm('Are You Sure You Want To Quit?')){
    history("/")
  }
  
  }
  const handleHint = ()=>{
    if(Hint>0){
      const options = Array.from(document.querySelectorAll('.answer-text'));
      let indexOfanswer;
   
      options.forEach((option, index)=>{
       if(option.innerHTML.toLowerCase()===answer.toLowerCase()){
         indexOfanswer = index;
       }
      })
     while(true){
       const random = Math.round(Math.random()*3);
       if(random!== indexOfanswer && !prevRandom.includes(random)){
         options.forEach((option, index)=>{
           if(index===random){
             option.style.visibility = 'hidden';
             setprevRandom(prevRandom.concat(random))
             setHint(Hint-1)
           }
         })
         break;
       }
       if(prevRandom.length>=3) break;   
     }
    }
  }
  const show=()=>{
    const options = Array.from(document.querySelectorAll('.answer-text'));
    options.forEach((option)=>{
      option.style.visibility = 'visible';
    })
    setFifty({...fifty, used:false})
  }
  
  const handlefifty = ()=>{
if(fifty.have>0 && !fifty.used){

  const options = Array.from(document.querySelectorAll('.answer-text')); 
  let indexOfanswer;
  let Randoms =[];
  options.forEach((option, index)=>{
    if(option.innerHTML.toLowerCase()===answer.toLowerCase()){
      indexOfanswer = index;
    }
   })
  let count =0;
   do{
    const random = Math.round(Math.random()*3);
    if(random!==indexOfanswer){ 
      if(Randoms.length < 2 && !Randoms.includes(indexOfanswer) && !Randoms.includes(random)){
        Randoms.push(random);
            count++ 
      }else{
        while(true){
          const newRandom = Math.round(Math.random()*3)
        if(!Randoms.includes(newRandom)&&!Randoms.includes(indexOfanswer)){
          Randoms.push(newRandom);
          count++;
          break;
        }
      }
      }
    
  
    }
     
  }while(count<2); 
  options.forEach((option, index)=>{
    if(Randoms.includes(index)){
      option.style.visibility = 'hidden';
      setFifty({used:true, have:fifty.have-1})
    }})

}


  }
  
  const ch = time.minutes > -1? '0' + time.minutes:time.minutes; 
  const chs = time.seconds<10? '0' + time.seconds:time.seconds;  
  const check = currentQuestionindex === 0? true:false;
  const disable = nextQestion===undefined? true:false;
  const endQuiz = ()=>{
   

  alert("Quiz ended!!!!!")
  history("/play/result", {state:{stats}})

  
  
  }
  useEffect(display, [])
 
     
     
    return <React.Fragment>
    <ToastContainer/>
     <Helmet><title>Quiz-Page</title></Helmet>
    <Fragment>
    <audio src={correctnotificatiom} id="correct-sound" />
    <audio src={wrongnotify} id="wrong-sound" />
    <audio src={btnnotify} id="button-sound" />
   </Fragment>
    <h1 className='quiz-head'>Free Quiz Mode</h1>
    <div className='quiz-container'>
    <div className='icons'>
    {console.log("correct:" + stats.NoHint)}
    {console.log("tried:" + stats.tried)}
    {console.log("fifty:" + stats.NoFifty )}

        <span onClick={handlefifty} className='fa fa-eye eye'>{fifty.have}</span>
        <span onClick={handleHint} className='fa fa-lightbulb light'>{Hint}</span>
    </div>
    <div className='quiz-text'>
      <span className='question-number'><span>{questionsNo} of 15</span></span>
      <span className='fa fa-clock time'><span className='sp'>{ch} : {chs}</span></span>
    </div>
       <p className='question'>{currentQuestion.question}</p>
      <div className='answers'>
            <p  onClick={handleAnswer}  className='answer-text'>{currentQuestion.optionA}</p>
           <p  onClick={handleAnswer} className='answer-text'>{currentQuestion.optionB}</p>
      </div>
      <div className='answers'>
            <p  onClick={handleAnswer} className='answer-text'>{currentQuestion.optionC}</p>
           <p  onClick={handleAnswer} className='answer-text'>{currentQuestion.optionD}</p>
      </div>
      <div className='buttons'>
      
        <button onClick={handleBtn} id='prev' className='prev' disabled={check}>Previous</button>
        <button onClick={handleBtn} id='next' className='next'>Next</button>
        <button onClick={handleBtn} id='quit' className='quit' disabled={disable}>Quit</button>
      </div>
    </div>
   
   </React.Fragment>
 
}

export default Quizpage;