import React,{useState,useRef} from 'react'
import './Quiz.css'
import {data} from '../../assets/data'

function Quiz() {

     let [index,setIndex]=useState(0);
     let [question,setQuestion]=useState(data[index]);
     let [lock,setLock]=useState(false); //if press one option ,lock another options(at a time click 1 option)
     let [score,setScore]=useState(0);
     let [result,setResult]=useState(false);


     let Option1=useRef(null);//for highligthing correct answer if  press wrong answer
     let Option2=useRef(null);//for highligthing correct answer if press wrong answer
     let Option3=useRef(null);//for highligthing correct answer if  press wrong answer
     let Option4=useRef(null);//for highligthing correct answer if  press wrong answer

     let option_array=[Option1,Option2,Option3,Option4];//for highligthing correct answer if i press wrong answer



 const checkAns=(e,ans)=>{
    if (lock===false)
    {
     if(question.ans===ans){
     e.target.classList.add("correct");
     setLock(true);
     setScore(previous=>previous+1);
        }
     else{
     e.target.classList.add("wrong");
     setLock(true);
     option_array[question.ans-1].current.classList.add("correct")//question starts from 1 index ,answer starts from 0 index thats why add -1 here , used to answer starts from 1)
        }
    }
    
 }

const next=()=>{
if(lock===true){
    if(index===data.length-1){
        setResult(true);
        return 0 //for last question press next ,it won't execute below process
       }

    setIndex(++index); //if press next button index will increase 
    setQuestion(data[index]);//and display next question
    setLock(false); //in second question we click option thats y set false again
    option_array.map((option)=>{ // if press next ,question and answer only change , selecting answer(green and red) are remain same of previous question thats y add map here 
      option.current.classList.remove("wrong") ;
      option.current.classList.remove("correct");
      return null;  
    })
}
}


const reset=()=>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
}

  return (

    <div className='container'>
        <h1>Quiz App</h1>
        <hr></hr>
        {result?<></>//if press next button in last question it will show score
               :<>  <h2>{index+1}.{question.question}</h2>
               <ul>
                   <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                   <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                   <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                   <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
               </ul>
               <button onClick={next} >Next</button>
           <div className="index">{index+1} of {data.length} questions</div>  </>}
      

{result?<><h2> You Scored {score} out of {data.length}</h2>
<button onClick={reset} >Reset</button></>// score display on every question ,so it will show only after last question
       :<></>}


    </div>
  )
}

export default Quiz