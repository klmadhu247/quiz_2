import React, { useEffect, useState } from 'react';
import './quiz.css'
import qz from './assets/qz.webp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uuid4 from 'uuid4';

 function Login() {

  const API = 'http://localhost:5000';
  const [userName,setUserName] = useState('');
  const [pass,setPass] = useState('');
  const [isSignup,setSignup] = useState(false);
  const navigate=useNavigate();
  const [userData,setUserData] = useState([]);
  const [error,setError] = useState('');

  const [newUserName,setNewUserName] = useState('');
  const [newPassword,setNewPassword] =useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  var randomId=uuid4();
 

 

  useEffect(()=>{
    const fetchUser = async()=>{
      const response = await axios.get(`${API}/users`);
      setUserData(response.data);

    }
    fetchUser()
  },[])


 console.log(userName)
//  console.log(pass)
//  console.log(checkUser)

console.log(newUserName)
console.log(newPassword);
console.log(confirmPassword);

  

const handleSignin= async(e)=>
{
  e.preventDefault();
  if(!userName||!pass)
  {
    alert('UserName & Password is Required')
  }

  try{

    const usr = userData.find(ud=>ud.username==userName);
    
  
  if (!usr) {
    alert("User not found! Please check your username.");
    return;
  }

  if (pass !== usr.password) {
    alert("Incorrect Password! Please check again.");
    return;
  }

  navigate('/quiz')

  }
  catch(error){
    setError(error.message);


  }
}

const handleSingUP=async(e)=>
{
  const userCheck = userData.find(ud=>ud.username==newUserName);

  if(!userCheck && newPassword===confirmPassword)
  {
    const newUser = {
      id:randomId,
      username:newUserName,
      password:newPassword
      
    }

    const respo = await axios.post(`${API}/users`,newUser)

    setUserData([...userData,respo.data]);
    alert("Signup successful! You can now log in.");

  }

}




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

    <div className='login template d-flex justify-content-center align-items-center'>
      <div className='40-w p-5 rounded bg-white bg-transparent ms-7'>
      <h2 className='p-4'>{isSignup?"Signup":"Sign In"}</h2>
     {!isSignup && <form>
      
       <div>
      <div className='mb-2'>
        <label htmlFor='username'>User Name</label>
        <input type='text' placeholder='Enter User Name' value={userName} onChange={(e)=>setUserName(e.target.value)} className='form-control'></input>

      </div>

      <div className='mb-2'>
        <label htmlFor='Password'>Password</label>
        <input type='password' placeholder='Enter Password' value={pass} onChange={(e)=>setPass(e.target.value)} className='form-control'></input>

      </div>
      <div >
        <button type='sumbit' className='btn btn-primary' onClick={handleSignin}>Sign In</button>
      </div></div>



      <div className='mt-7'>
        <span className='font-medium'>New User?</span>       <button className='btn btn-primary' onClick={(e)=>{e.preventDefault();setSignup(!isSignup)}}>Signup</button>
      </div>
     </form>}

     {isSignup &&<form>
  <div className='mb-2'>
        <label htmlFor='username'>User Name</label>
        <input type='text' value={newUserName} placeholder='Enter User Name' className='form-control' onChange={(e)=>setNewUserName(e.target.value)}></input>

      </div>

      <div className='mb-2'>
        <label htmlFor='Password'>Password</label>
        <input type='password' value={newPassword} placeholder='Enter Password' onChange={(e)=>{setNewPassword(e.target.value)}} className='form-control'></input>

      </div>

      <div className='mb-2'>
        <label htmlFor='Confirm Password'>Confirm Password</label>
        <input type='password' value={confirmPassword} placeholder='Confirm Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} className='form-control'></input>

      </div>
      <button className='btn btn-primary' onClick={handleSingUP}>Signup</button>
  </form>}

     </div>
    </div>

    

    </div>
    )
    

}
export default Login;