import React, { useState } from 'react'
import { singupHook } from '../../hooks/singupHook';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setcredentials] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {signup,Loading} = singupHook();
    function handleChange(e){
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault();
       
        signup(credentials);
        setcredentials({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""})
    }
    
    return (
        <div className="home">
            <div className='signup'>
                <h1>Sign Up to CodeReview</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='username'  placeholder='name' onChange={handleChange}  value={credentials.name} /> <br />
                    <input type="email" name='email' placeholder='email' onChange={handleChange}  value={credentials.email}/> <br />
                    <input type="password" name='password' placeholder=' password' onChange={handleChange}  value={credentials.password}/> <br />
                    <input type="password" name='confirmPassword' placeholder='confirm password' onChange={handleChange}  value={credentials.confirmPassword}/> <br />
                    <button type="submit" disabled={Loading}>{Loading ? "Loading..." :"SignUp"}</button>
                    <Link to="/signin">Already have a account? please signin</Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;