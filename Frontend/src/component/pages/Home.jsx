import React from 'react'
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div>
        <NavBar></NavBar>
      </div>
      <div className='content'>
        <h1>AI Code-Reviewer</h1>
        <p>Welcome to AI Code Reviewer, an intelligent tool powered by the Google Gemini API to analyze and improve your code. Detect errors, get optimization suggestions, and enhance code quality effortlessly. Stay tuned as we evolve into a full-stack MERN app with a sleek, customizable interface!</p>
        <button ><Link to="/review"> Get Started</Link></button>
      </div>
    </div>
  )
}

export default Home;