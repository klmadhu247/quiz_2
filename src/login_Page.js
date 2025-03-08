import React, { useEffect, useState } from 'react';
import './quiz.css';
import qz from './assets/qz.webp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uuid4 from 'uuid4';

function Login({ setUser }) {
  const API = 'http://localhost:5000';
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [isSignup, setSignup] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState('');

  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  var randomId = uuid4();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${API}/users`);
      setUserData(response.data);
    };
    fetchUser();
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    
    if (!userName || !pass) {
        alert("UserName & Password are required");
        return;
    }

    try {
        const usr = userData.find((ud) => ud.username === userName);

        if (!usr) {
            alert("User not found! Please check your username.");
            return;
        }

        if (pass !== usr.password) {
            alert("Incorrect Password! Please check again.");
            return;
        }

        setUser(usr);

        navigate(usr.username === "admin" ? "/admin" : "/quiz", { state: { user: usr } });
    } catch (error) {
        setError(error.message);
    }
};


  const handleSingUP = async (e) => {
    const userCheck = userData.find((ud) => ud.username == newUserName);

    if (!userCheck && newPassword === confirmPassword) {
      const newUser = {
        id: randomId,
        username: newUserName,
        password: newPassword,
      };

      const respo = await axios.post(`${API}/users`, newUser);

      setUserData([...userData, respo.data]);
      alert('Signup successful');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center py-5">
      <div className="row w-75 border-2 mt-4 rounded-3xl border-red-300 shadow-2xl bg-gray-300">
    
      <div className="col-12 col-md-6 bg-violet-200 p-4 d-flex flex-row justify-content-center align-items-center lg:border rounded-s-3xl md:border sm:border rounded-t-3xl">
        <div className='d-flex flex-col  justify-content-center align-itmes-center'>
  <h2 className="text-3xl font-bold text-center mb-3 mr-4">
    Welcome to the
    
  </h2>
  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-red-600 via-yellow-400 via-blue-600 via-green-600 to-red-600 text-transparent bg-clip-text">
      QuizHunt </span>
    </div>
  <img src={qz} className="w-20 h-auto mt-4 animate-bounce" />
</div>

  
  <div className="col-12 col-md-6 d-flex justify-content-center align-items-center py-4">
    <div className="w-100 p-5 rounded bg-white bg-transparent">
      <h2 className="p-4 text-center">{isSignup ? 'Signup' : 'Sign In'}</h2>

   {!isSignup && (
    <form>
  <div className="mb-2">
<label htmlFor="username">User Name</label>
    <input type="text" placeholder="Enter User Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" required/> </div>

      <div className="mb-2">
        <label htmlFor="Password">Password</label>
        <input type="password" placeholder="Enter Password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control" required />
      </div>

      <div>
        <button type="submit" className="btn btn-primary w-130" onClick={handleSignin}>Sign In</button>
      </div>
      <div className="mt-3 text-center">
        <span className="font-medium">New User?</span>
     <button className="btn btn-link"onClick={(e) => { e.preventDefault(); setSignup(!isSignup)}}>Signup</button>
      </div>
    </form>
            )}

    {isSignup && (
      <form>
        <div className="mb-2">
          <label htmlFor="username">User Name</label>
          <input type="text" value={newUserName} placeholder="Enter User Name" className="form-control"
            onChange={(e) => setNewUserName(e.target.value)} />
        </div>

 <div className="mb-2">
         <label htmlFor="Password">Password</label>
<input type="password" value={newPassword} placeholder="Enter Password" onChange={(e) => setNewPassword(e.target.value)} className="form-control"/> </div>

      <div className="mb-2">
        <label htmlFor="Confirm Password">Confirm Password</label>
  <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleSingUP}>Signup</button>
              </form>
            )}
   </div>
    </div>
      </div>
    </div>
  );
}

export default Login;
