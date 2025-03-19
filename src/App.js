import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login_Page.js";
import Quiz_Page from "./Quiz_Page.js";
import Questions from "./Questions.js";
import Result from "./Result.js";
import Admin from "./Admin.js";
import ProtectedRoute from './protectedRoute.js'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/quiz" element={<Quiz_Page />} />
            <Route path="/qstns" element={<Questions />} />
            <Route path="/result" element={<Result />} />
                
             <Route path="/admin" element={<ProtectedRoute element={<Admin />} user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
