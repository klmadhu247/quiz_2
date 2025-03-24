import React, { useEffect } from "react";
import qz from './assets/qz.webp';
import { useLocation, useNavigate } from "react-router-dom";

function Quiz_Page({setUser}) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {}; 
  const userAttempt = user?.hasAttempted || false; 

  // ✅ Show message for 3 seconds, then redirect
  useEffect(() => {
    if (userAttempt) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true, state: null });
        setUser(null);
        localStorage.removeItem("user");
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [userAttempt, navigate]);

  const handleStart = () => {
    navigate('/qstns', { state: { us: user } });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true, state: null });
  };
  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center py-5">
      <div className='row w-75 border-2 mt-4 h-[480px] rounded-3xl border-red-300 shadow-2xl bg-gray-300'>
        
        <div className='col-12 col-md-6 bg-violet-200 p-4 d-flex flex-column justify-content-center align-items-center lg:border rounded-s-3xl md: border rounded-t-3xl'>
          <h2 className='text-3xl font-bold text-center mb-3'>
            Welcome to the{' '}
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-red-600 via-yellow-400 via-blue-600 via-green-600 to-red-600 text-transparent bg-clip-text">
              QuizHunt
            </span>
          </h2>
          <img src={qz} className="w-20 h-auto mt-4 animate-bounce" alt="quiz logo" />
        </div>

        {!userAttempt ? (
          <div className='col-12 col-md-6 d-flex justify-content-center align-items-center py-4'>
            <div className='w-100 p-5 rounded bg-white bg-transparent'>
              <h3 className="text-center mb-4">Quiz Instructions</h3>
              <h5 className="mb-3">Each question carries one mark.</h5>
              <h5 className="mb-3">You must complete the quiz within 1 minute.</h5>

              <div className="d-flex justify-content-center">
                <button className="btn btn-primary w-100 w-md-auto" onClick={handleStart}> Start Quiz</button>
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn btn-danger w-20 mt-3 w-md-auto" onClick={handleLogout}> Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='col-12 col-md-6 d-flex justify-content-center align-items-center py-4'>
            <div className='w-100 p-5 rounded bg-white bg-transparent'>
              <h3 className="text-center mb-4 text-danger">You have already attempted this quiz. Redirecting...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz_Page;
