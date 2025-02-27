
import Login from './login_Page.js'
import Signup from './signup_Page.js';
import Quiz_Page from './Quiz_Page.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './Questions.js';
import Result from './Result.js';
import Admin from './Admin.js';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
     <Route path='/quiz' element={<Quiz_Page/>}></Route>
     <Route path='/qstns' element={<Questions/>}></Route>
     <Route path='/result' element={<Result/>}></Route>
     <Route path='/admin' element={<Admin/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
