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
    const [warned, setWarned] = useState(false);
    const[isSubmitting,setIsSubmitting] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showLogout,setShowLogout]= useState(false)


    
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

       

        const disableRightClick = (e) => e.preventDefault();
        const disableCopy = (e) => e.preventDefault();

        const handleVisibilityChange = () => {
            if (document.hidden) {
                
                if (!warned) {
                    alert("You switched tabs! Please stay on the quiz tab.");
                    setWarned(true); // Mark as warned
                } else {
                    
                    handleSubmit();
                }
            }
        };
      document.addEventListener('contextmenu', disableRightClick);
        document.addEventListener('copy', disableCopy);
        document.addEventListener('visibilitychange',handleVisibilityChange);

        

        return () => {
            clearInterval(timer);
         document.removeEventListener('contextmenu', disableRightClick);
           document.removeEventListener('copy', disableCopy);
         document.removeEventListener('visibilitychange',handleVisibilityChange);
        };
    

    },[timeLeft])

    const handleNext = () => {
        if (selected === Questions[questionIndex].answer) {
            setScore((prev) => prev + 1);
            setCorrectAnswers([...correctAnswers, selected]);
        }
    
       
        setSelectedAnswers((prev) => {
            const updatedAnswers = [...prev]; 
            updatedAnswers[questionIndex] = selected; 
            return updatedAnswers; 
        });
    
        setSelected(""); 
    
        if (questionIndex < Questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            alert("No More Questions");
        }
    };
    

    const handlePrev = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
            setSelected(selectedAnswers[questionIndex - 1] || ""); 
        }
    };
    

    const  handleSubmit=async()=>
    {
        setShowLogout(!showLogout);
        
        setIsSubmitting(true);
        const updatedUser = {...user,hasAttempted:true,answers:{correctAnswers}}
        let finalScore =score
        if(selected==Questions[questionIndex].answer)
        {
            finalScore++
        }

        

        const resp = await axios.put(`${API}/users/${user.id}`,updatedUser);
       




        setTimeout(() => {
            setIsSubmitting(false); 
            navigate('/')
        }, 2000);
    }

    // console.log(Questions)
    // console.log(Questions[questionIndex])
console.log(selected)

console.log(score)

const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
    navigate("/"); 
};



  return (
    <div className='flex flex-col justify-center items-center border-2 mt-2 rounded-3xl border-red-300 h-3/4 w-3/4 mx-auto shadow-2xl bg-violet-200' style={{ height: '500px' }}>
      <div className='p-2 text-center'>
      <div className="flex flex-row justify-center items-end mb-14 mx-auto"><h2 className='text-2xl font-bold'><span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-red-600 via-yellow-400 via-blue-600 via-green-600 to-red-600 text-transparent bg-clip-text">
  QuizHunt
</span>
 </h2> <img src={qz} className="w-10 h-auto mb-2  animate-bounce " />
 </div>

      {/* {  Questions.map(qs=><p>{qs.question}<ul><li>{qs.options.map(q=>(<><input type="radio" className="ml-1"/><span className="ml-1">{q}</span></>))}</li></ul></p>)} */}
       {!isSubmitting? (
        <> 
       <h5 className="mb-4">Time Remaining: <span className={timeLeft<11? 'text-red-400':''}> {timeLeft} </span> </h5>

        {Questions.length===0? (<p>Questions are Loading Please Wait...</p>):(<div key={questionIndex}><h4>{Questions[questionIndex].question}</h4>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
    {Questions[questionIndex]?.options.map((op, id) => (
        <label key={id} className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="Option" value={op} checked={selected === op} onChange={(e) => setSelected(e.target.value)} className="form-radio text-blue-600" />
            <span className="text-gray-800">{op}</span>
        </label>
    ))}
</div>


   <button className="btn btn-warning flex items-center w-20 mr-4 hover:border-red-500" disabled={questionIndex==0} onClick={handlePrev}>Prev</button>
    <button className="btn btn-primary w-20 flex items-center hover:border-red-500"  disabled={questionIndex==Questions.length-1} onClick={handleNext}>Next  </button>
    <button className="btn btn-success ml-10" onClick={handleSubmit}>sumbit</button>

   
    </div>


    
    
    
    )}</>):
    (  <p className="text-lg font-semibold text-blue-500">Submitting your Quiz...</p>)
}
{showLogout && <div className="d-flex flex-col justify-content-center">
            <button className="btn btn-primary w-20 mt-3 mx-auto w-md-auto" onClick={handleLogout}> Logout</button>
          </div>}

      </div>
    </div>
  );
}

export default Questions;
