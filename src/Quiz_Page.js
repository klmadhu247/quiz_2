import React from "react";
import qz from './assets/qz.webp'
import { useNavigate } from "react-router-dom";


function Quiz_Page(){
const navigate = useNavigate();
    const handleStart=()=>
    {
        navigate('/qstns')


    }

    return(
        <div>
           <div className='flex flex-row gap-1  border-2 mt-10 rounded-3xl border-red-300  h-3/4 w-3/4 mx-auto items-start shadow-2xl bg-gray-300' style={{height:'500px'}}>
        <div className='h-full bg-violet-200 border rounded-s-3xl'>
    <div className='pl-14 mt-20 '>
<div className='flex flex-row items-end '><h2 className='text-3xl font-bold'>Welcome to the <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-red-600 via-yellow-400 via-blue-600 via-green-600 to-red-600 text-transparent bg-clip-text">
  QuizHunt
</span>
 </h2> <img src={qz} className="w-20 h-auto mt-4 animate-bounce " /> </div>



    </div>
    </div>

    <div className='login template d-flex justify-content-center align-items-center'>
      <div className='40-w p-10 rounded bg-white bg-transparent ms-20'>
     
      <h3>Quiz Instructions</h3>
<h5>Each question carries one mark.
</h5>
<h5>    
    You must 
complete the quiz within 1 minute.</h5>
<button className="btn btn-primary" onClick={handleStart}>Start Quiz</button>

 

     </div>
    </div>

    

    </div>

        </div>
    )
}
export default Quiz_Page;