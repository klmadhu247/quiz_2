import React, { useEffect, useState } from "react";
import axios from "axios";
import qz from './assets/qz.webp'
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";


function Questions() {
    const [Questions,setQuestions]= useState([]);
    const [users,setUsers] = useState([]);
    const API = 'http://localhost:5000';
    const [questionIndex,setQuestionIndex] = useState(0)
const [selected,setSelected] =useState('');
    const [score,setScore] =useState(0);
    const navigate = useNavigate();
    const [timeLeft,setTimeLeft] = useState(60);
    const [correctAnswers,setCorrectAnswers] = useState([]);

    
    const location = useLocation();
 const user = location.state.us;


    
    useEffect(()=>{
        const fetchQuestions =async()=>
        {
            const response = await axios.get(`${API}/questions`)
            setQuestions(response.data)
            
        }
        const fetchUsr = async()=>
            {
                const res = await axios.get( `${API}/users`)
            setUsers(res.data)}
        fetchQuestions();
        fetchUsr();


        const timer = setInterval(()=>{
            if(timeLeft>1)
            {
                setTimeLeft((pre)=>pre-1);
            }
            else{
                clearInterval(timer);
                navigate('/')

            }
           
            
        },1000)

        return ()=> clearInterval(timer);
    

    },[timeLeft])

    const handleNext=()=>
    {
        
        
        if(selected==Questions[questionIndex].answer)
            {
                setScore((pre)=>pre+1);
                setCorrectAnswers([...correctAnswers,selected])
            }

            setSelected("")
       
        if(questionIndex<Questions.length-1)
        {
            setQuestionIndex(questionIndex+1);

        }
        else{
            alert('No More Questions')
        }

        
    }

    const handlePrev=()=>
    {
        if(questionIndex>0)
        {
            setQuestionIndex(questionIndex-1)
        }

    }

    const  handleSubmit=async()=>
    {
        const updatedUser = {...user,hasAttempted:true,answers:{correctAnswers}}
        let finalScore =score
        if(selected==Questions[questionIndex].answer)
        {
            finalScore++
        }

        

        const resp = await axios.put(`${API}/users/${user.id}`,updatedUser);
       




        navigate('/result',{state:{score:finalScore}})
    }

    // console.log(Questions)
    // console.log(Questions[questionIndex])
console.log(selected)

console.log(score)



  return (
    <div className='flex flex-col justify-center items-center border-2 mt-2 rounded-3xl border-red-300 h-3/4 w-3/4 mx-auto shadow-2xl bg-violet-200' style={{ height: '500px' }}>
      <div className='p-2 text-center'>
      <div className="flex flex-row justify-center items-end mb-14 mx-auto"><h2 className='text-2xl font-bold'><span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-red-600 via-yellow-400 via-blue-600 via-green-600 to-red-600 text-transparent bg-clip-text">
  QuizHunt
</span>
 </h2> <img src={qz} className="w-10 h-auto mb-2  animate-bounce " />
 </div>

 <h5 className="mb-4">Time Remaining: <span className={timeLeft<11? 'text-red-400':''}> {timeLeft} </span> </h5>
      {/* {  Questions.map(qs=><p>{qs.question}<ul><li>{qs.options.map(q=>(<><input type="radio" className="ml-1"/><span className="ml-1">{q}</span></>))}</li></ul></p>)} */}
       {Questions.length===0? (<p>Questions are Loading Please Wait...</p>):(<div key={questionIndex}><h4>{Questions[questionIndex].question}</h4>
   <p>{Questions[questionIndex].options.map((op,id)=><><input type="radio" name="Option" value={op}onChange={(e)=>{setSelected(e.target.value)}} className="ml-1"/><span className="ml-1">{op}</span></>)} </p>

   <button className="btn btn-warning flex items-center w-20 mr-4 hover:border-red-500" disabled={questionIndex==0} onClick={handlePrev}>Prev</button>
    <button className="btn btn-primary w-20 flex items-center hover:border-red-500"  disabled={questionIndex==Questions.length-1} onClick={handleNext}>Next  </button>
    <button className="btn btn-success ml-10" onClick={handleSubmit}>sumbit</button>
    </div>
    
    
    
    )}


      </div>
    </div>
  );
}

export default Questions;
