import { Routes, Route } from 'react-router-dom';
import './App.css';
import ReviewerCode from './component/pages/ReviewerCode';
import Home from './component/pages/Home';
import SingUp from './component/Singup/Singup';
import { getUserContext } from './context/userContext';
import SingIn from './component/SignIn/Signin';
import Contact from './component/pages/Contact';
import SignUp from './component/Singup/Singup';
function App() {
  const { authUser} = getUserContext();
 
  return (
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/review" element={ authUser? <ReviewerCode /> :<SingUp/>} />
      <Route path="/signin" element={ authUser? <ReviewerCode /> :<SingIn/>} />
      <Route path="/signup" element={ authUser? <ReviewerCode /> :<SingUp/>} />
      <Route path="/contact" element={ authUser? <Contact /> :<SingUp/>} />

    
    </Routes>
  );
}

export default App;
