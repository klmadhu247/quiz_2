import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid4 from "uuid4";
import { useNavigate } from "react-router-dom";

function Admin({user,setUser}) {

    const API = 'http://localhost:5000';
    const [users,setUsers] = useState([]);
    const [isUserPage,setIsUserPage] = useState(true);
    const [isQuestionsPage,setIsQuestionsPage] = useState(false);
    const [questions,setQuestions] =useState([]);
    const [isNewQuestionPage,setIsNewQuestionPage] = useState(false)
    const [newQuestion,setNewQuestion] = useState('');
    const [option_A,setOption_A] = useState('');
    const [option_B,setOption_B] = useState('');
    const [option_C,setOption_C] = useState('');
    const [option_D,setOption_D] = useState('');
    const [newAnswer,setNewAnswer] =useState('');
    const [isEditQUestion,setIsEditQUestion] = useState(false);

    const [editingQuesation,setEditingQuestion] = useState([]);

    const [editingQUestion_ID,setEditingQUestion_ID] = useState('');

    const dynamicID = uuid4();
    const [sortOrder, setSortOrder] = useState('asc');

    const navigate = useNavigate();
    const [searchQuery,setSearchQuery] = useState("");
    

    useEffect(()=>
    {
        const usr = async()=>
        {
            const res = await axios.get(`${API}/users`);
            setUsers(res.data);
        }

        

        const qstns = async () => {
            const resp = await axios.get(`${API}/questions`);
            console.log("Fetched questions:", resp.data); 
            setQuestions(resp.data);
        };
        
        usr();
        qstns();
    },[newQuestion])

    // console.log('The QUestions are: ',questions);

    const handleAddQUestion=()=>
    {
        setIsNewQuestionPage(true);
        setIsQuestionsPage(false);
        

    }
    const handleChange=(e)=>
    {
        const {name,value} = e.target;
        if(name==='newQuestion')
        {
            setNewQuestion(value);
        }
        else if (name==='option_A')
        {
            setOption_A(value)
        }
        else if( name==='option_B')
        {
            setOption_B(value);
        }
        else if (name==='option_C')
        {
            setOption_C(value)
        }
        else if(name==='option_D')
        {
            setOption_D(value)
        }
        else if (name==='newAnswer'){
            setNewAnswer(value)
        }

        // console.log('THe New QUstion and answer is: ',newQuestion+ ''+option_A+
        //     ''+option_B+''+option_C+''+ option_D+' '+ newAnswer
        // )

        
    }
    const handleCancel=()=>
        {
            setIsQuestionsPage(true);
            setIsNewQuestionPage(false);
            setIsEditQUestion(false);
            setNewAnswer(''); setNewQuestion('');setOption_A('');setOption_B('');setOption_C(''); setOption_D('')


        }

        const handleNewQuestion = async () => {
            if (!newQuestion || !option_A || !option_B || !option_C || !option_D || !newAnswer) {
              alert("Please fill in all fields before adding the question.");
              return;
            }
          
           
            const newQuestionSet = {
              "id": dynamicID,
              "question": newQuestion,
              "options": [option_A, option_B, option_C, option_D],
              "answer": newAnswer
            };
          
            try {
             
              const respo = await axios.post(`${API}/questions`, newQuestionSet);
              
             
              setQuestions(prevQuestions => [...prevQuestions, respo.data]);  
              
              setNewQuestion('');
              setOption_A('');
              setOption_B('');
              setOption_C('');
              setOption_D('');
              setNewAnswer('');
          
              
              setIsQuestionsPage(true);
              setIsNewQuestionPage(false);
          
            } catch (error) {
              console.error("There was an error adding the question:", error.message);
              alert("Failed to add question. Please try again.");
            }
          };
          

        const handleEditQuestion=async(id)=>
        {
            setIsEditQUestion(true);
             
            setEditingQUestion_ID(id);

            const res = await axios.get(`${API}/questions/${id}`);

             setEditingQuestion(res.data);
            
           
            setIsQuestionsPage(false);
            setIsUserPage(false);

            if (res.data) {
                setNewQuestion(res.data.question);
                setOption_A(res.data.options[0]);
                setOption_B(res.data.options[1]);
                setOption_C(res.data.options[2]);
                setOption_D(res.data.options[3]);
                setNewAnswer(res.data.answer);
            }
        
         console.log('The Editing QUestion: ',editingQuesation);   
        }
      
        const handleEditAddQuestion= async()=>
       {
        

        console.log('The Editing Question ID:',editingQUestion_ID);

        const EditedQUestionSet =  {
           
            "question": newQuestion,
            "options": [option_A,option_B,option_C,option_D],
            "answer": newAnswer
    }
          const updateQUestion = await axios.put(   `${API}/questions/${editingQUestion_ID}`,EditedQUestionSet);

          const updatedQuestions = await axios.get(`${API}/questions`);
          setQuestions(updatedQuestions.data);

          setIsEditQUestion(false);
          setIsQuestionsPage(true);

       }

       const handleDelete=async(id)=>
       {
        const respo = await axios.delete(`${API}/questions/${id}`);
    
        const updatedQ = await axios.get(`${API}/questions`);
        setQuestions(updatedQ.data);
       }
       const toggleSortOrder = () => {
        const sortedUsers = [...users].sort((a, b) => {
            const scoreA = a.answers && a.answers.correctAnswers ? a.answers.correctAnswers.length : 0;
            const scoreB = b.answers && b.answers.correctAnswers ? b.answers.correctAnswers.length : 0;
            return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
        });
        setUsers(sortedUsers);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        setUser(null); 
        navigate("/");
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );

    

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center py-5 mb-7">
      <div className="d-flex w-75 border-2 mt-1 rounded-3xl border-red-300 shadow-2xl bg-gray-300 h-[520px] overflow-y-auto">
        
        <div className=" d-flex flex-col w-3/4">
           
           {!isNewQuestionPage && <div className="d-flex py-3">
          <button className="btn btn-primary ml-2" onClick={()=>{setIsUserPage(!isUserPage);setIsQuestionsPage(false);setIsEditQUestion(false)}}>Users Details</button>
          <button className="btn btn-warning ml-2" onClick={()=>{setIsQuestionsPage(!isQuestionsPage);setIsUserPage(false);setIsEditQUestion(false)}}>Questions Page</button>
        </div>
}

{isUserPage && (
                        <div className=" mx-3 px-2 py-2">
                            <div className="flex items-center p-3 justify-between">
        <h3 className="text-2lg font-semibold mb-3 text-green-700">Users</h3>
        <input
          type="text"
          placeholder="Search by username..."
          className="p-2 border border-gray-300 rounded-lg w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
     
      <div className="overflow-x-auto">  
  <table className="table table-striped table-dark table-hover rounded-3 overflow-hidden shadow-lg w-100">
    <thead className="table-info">
      <tr>
        <th style={{ width: "12%" }}>User Name</th>
        <th style={{ width: "15%" }}>Department</th>
        <th style={{ width: "15%" }}>College</th>
        <th style={{ width: "20%" }}>Email</th>
        <th style={{ width: "10%" }}>Gender</th>
        <th style={{ width: "10%" }}>Quiz Taken</th>
        <th style={{ width: "18%" }}>
          Score  
          <button className="btn btn-sm btn-light ml-2" onClick={toggleSortOrder}>⇅</button>
        </th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.length > 0 ? (
        filteredUsers.filter(user => user.username !== "admin").map((user, index) => (
          <tr key={index}>
            <td className="py-3 px-4">{user.username}</td>
            <td className="py-3 px-4">{user.department || "N/A"}</td>
            <td className="py-3 px-4">{user.college || "N/A"}</td>
            <td className="py-3 px-4">{user.email || "N/A"}</td>
            <td className="py-3 px-4">{user.gender || "N/A"}</td>
            <td className="py-3 px-4">{user.hasAttempted ? "Yes" : "No"}</td>
            <td className="py-3 px-4">{user.answers?.correctAnswers?.length || 0}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="text-center py-3">No users found.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

                        </div>
                    )}

{isQuestionsPage &&  <div className="border-2 border-green-600 w-100 rounded-lg mx-3 my-2 px-2 py-2">
          <h5>Questions</h5>
          <table className="table table-striped table-dark rounded-3 overflow-hidden">
           
                <tbody>{questions.map((qs,id)=><tr><td className="d-flex justify-content-between">{qs.question} <div className="d-flex "><button className="btn btn-warning ml-5" onClick={()=>handleEditQuestion(qs.id)}>Edit </button><button className="btn btn-danger ml-5" onClick={()=>handleDelete(qs.id)}>Delete</button></div></td></tr>)} </tbody>
            
          </table>
          <div className="d-flex justify-content-end">
    <button className="btn btn-success" onClick={handleAddQUestion}>Add Question</button>
  </div>

          

        </div>
        }

{isNewQuestionPage && <div className="  w-100 rounded-lg mx-10 my-2 px-2 py-2">
<div className="bg-white p-2 rounded-lg" >
    <h4 className="text-xl mb-1">Add New Question</h4>
    <div className="mb-2 d-flex justify-content-center align-items-center">
        <label className="text-sm font-semibold mr-2">Question: </label>
        <input type="text" placeholder="Your Question Here..." name="newQuestion" value={newQuestion}  
        onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md"/>
    </div>
    <div className="mb-2">
        <label className=" text-sm font-semibold">Options</label>
        <div className="border border-gra-300 p-2 w-full rounded-md">
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">A:</label>
            <input type="text" name="option_A" value={option_A} placeholder="Option A"
           onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">B:</label>
            <input type="text" name="option_B" value={option_B} placeholder="Option B" onChange={handleChange}className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">C:</label>
            <input type="text" name="option_C" value={option_C} placeholder="Option C"onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">D:</label>
            <input type="text" name="option_D" value={option_D} placeholder="Option D" onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
        
        </div>
                    
        </div>
        <div className=" d-flex justify-content-center align-items-center mb-3">
            <label className="block text-sm font-semibold mr-2">Answer:</label>
            <input type="text"  name="newAnswer" value={newAnswer} className="border border-gray-300 p-2 w-full rounded-md" onChange={handleChange}/>
        </div>
        <div className="flex justify-end">
            <button  className="btn btn-danger mr-2" onClick={handleCancel}>Cancel</button>
            <button  className="btn btn-success" onClick={handleNewQuestion}>Add Question</button>
        </div>
            </div>
        </div>
}



{isEditQUestion && <div className="  w-100 rounded-lg mx-10  px-2 py-2">
<div className="bg-white p-2 rounded-lg" >
    <h4 className="text-xl mb-1">Edit Question</h4>
    <div className="mb-2 d-flex justify-content-center align-items-center">
        <label className="text-sm font-semibold mr-2">Question: </label>
        <input type="text" placeholder="Your Question Here..." name="newQuestion" value={newQuestion}  
        onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md"/>
    </div>
    <div className="mb-2">
        <label className=" text-sm font-semibold">Options</label>
        <div className="border border-gra-300 p-2 w-full rounded-md">
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">A:</label>
            <input type="text" name="option_A" value={option_A} placeholder="Option A"
           onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">B:</label>
            <input type="text" name="option_B" value={option_B} placeholder="Option B" onChange={handleChange}className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">C:</label>
            <input type="text" name="option_C" value={option_C} placeholder="Option C"onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
            <div className="d-flex justify-content-center align-items-center">
            <label className="text-sm mr-2 ">D:</label>
            <input type="text" name="option_D" value={option_D} placeholder="Option D" onChange={handleChange} className="border border-gray-300 p-2 w-full rounded-md mb-1"/>

            </div>
        
        </div>
                    
        </div>
        <div className=" d-flex justify-content-center align-items-center mb-3">
            <label className="block text-sm font-semibold mr-2">Answer:</label>
            <input type="text"  name="newAnswer" value={newAnswer} className="border border-gray-300 p-2 w-full rounded-md" onChange={handleChange}/>
        </div>
        <div className="flex justify-end">
            <button  className="btn btn-danger mr-2" onClick={handleCancel}>Cancel</button>
            <button  className="btn btn-success" onClick={handleEditAddQuestion}>Add Question</button>
        </div>
            </div>
        </div>
}
<div className="d-flex flex-col justify-content-center">
            <button className="btn btn-primary w-20 mt-3 mx-auto w-md-auto mb-4" onClick={handleLogout}> Logout</button>
          </div>

                    
        </div>
        
      </div>

      
    </div>
  );
}

export default Admin;
