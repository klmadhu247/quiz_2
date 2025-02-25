import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
    const location = useLocation();
    const scr = location.state.score;

    const navigate = useNavigate();

    const handleHome=()=>
    {
        navigate('/');

    }
    console.log(location.state.score);
  return (
    <div className='flex flex-col justify-center items-center border-2 mt-2 rounded-3xl border-red-300 h-3/4 w-3/4 mx-auto shadow-2xl bg-violet-200' style={{ height: '500px' }}>
      <div className='p-2 text-center'>
        <h3 className='text-2xl font-bold'>Result Page</h3>
        <h5>Your Score is: {scr} </h5>

        <button className="btn btn-warning" onClick={handleHome}>Home</button>
      </div>
    </div>
  );
}

export default Result;
