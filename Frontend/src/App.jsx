import { Routes, Route } from 'react-router-dom';
import './App.css';
import ReviewerCode from './component/pages/ReviewerCode';
import Home from './component/pages/Home';
import SignUp from './component/Singup/Singup';
import { getUserContext } from './context/userContext';
import SingIn from './component/SignIn/Signin';
import Contact from './component/pages/Contact';

function App() {
  const { authUser} = getUserContext();
 
  return (
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/review" element={ authUser? <ReviewerCode /> :<SignUp/>} />
      <Route path="/signin" element={ authUser? <ReviewerCode /> :<SingIn/>} />
      <Route path="/signup" element={ authUser? <ReviewerCode /> :<SignUp/>} />
      <Route path="/contact" element={ authUser? <Contact /> :<SignUp/>} />

    
    </Routes>
  );
}

export default App;
