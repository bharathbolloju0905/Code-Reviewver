import React, { useState } from 'react'

import {signInHook} from '../../hooks/signinHook';
import { Link } from 'react-router-dom';
const SignIn = () => {
    const [credentials, setcredentials] = useState({
    
        email: "",
        password: "",
       
    });
    const {signIn,Loading} = signInHook();
    function handleChange(e){
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault();
        
        signIn(credentials);
        setcredentials({
            email: "",
            password: "",
            })
    }
    
    return (
        <div className="home">
            <div className='signup'>
                <h1>Sign In to CodeReview</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name='email' placeholder='email' onChange={handleChange}  value={credentials.email}/> <br />
                    <input type="password" name='password' placeholder=' password' onChange={handleChange}  value={credentials.password}/> <br />
                    <button type="submit" disabled={Loading}>{Loading ? "Loading..." :"SingIn"}</button>
                    <Link to="/signup">Dont have any account? please signup</Link>

                </form>
            </div>
        </div>
    )
}

export default SignIn;