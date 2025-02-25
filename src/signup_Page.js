import React from "react";
import qz from './assets/qz.webp'

function Signup(){
    return(
        <div className='flex flex-row gap-1  border-2 mt-10 rounded-3xl border-red-300  h-3/4 w-3/4 mx-auto items-start shadow-2xl bg-gray-300' style={{height:'500px'}}>
          <div className='h-full bg-violet-200 border rounded-s-3xl'>
      <div className='pl-14 mt-20 '>
  <div className='flex flex-row items-end '><h2 className='text-3xl font-bold'>Welcome to the <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-red-600 via-yellow-400 via-blue-600 via-green-600 to-red-600 text-transparent bg-clip-text">
    QuizHunt
  </span>
   </h2> <img src={qz} className="w-20 h-auto mt-4 animate-bounce " /> </div>
  
  
  
      </div>
      </div>
  
      <div >
        <input type='text' placeholder='UserName'/>
      </div>
  
      
  
      </div>
      )
      
}
export default Signup;