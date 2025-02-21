import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getUserContext } from '../../context/userContext';
import { HiBars3 } from "react-icons/hi2";

const NavBar = () => {
    const { authUser } = getUserContext();
    const [navisable, setnavisable] = useState(false)
    const first = useRef(null) ;
    async function handleLogout() {
        if (!authUser) {
            window.location.href = '/signin';
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/user/logout');
            
            if (!res.ok) throw new Error("Logout request failed");

            const data = await res.json();
            localStorage.removeItem('authUser');
            toast.success("User logged out successfully");
            window.location.href = '/signin';
        } catch (error) {
            toast.error("Error while logging out");
        }
    }
    function handleClick(){
        
        console.log("Hellow",navisable)
        if(navisable){
            first.current.style.display ="none" ;
            setnavisable(false)
            return ;
        }
       else{

           first.current.style.display = "flex"
           setnavisable(true)
           return ;
       }
    }
    return (
        <nav>
            <ul>
                <div>
                    <span>&lt;</span><p>CodeReviewer</p><span>/&gt;</span>
                </div>
                <div>
                    <HiBars3 className='hambager' style={{
                        width: '30px',
                        height: '30px',
                        position: 'absolute',
                        cursor: 'pointer',
                        right: '6px',
                        top: '-1px',
                        display: 'none',
                        cursor:'pointer'
                    }} onClick={handleClick} />
                </div>
                <div ref={first} className={`nav-links`}>
                    <li><Link to="/">Home</Link> </li>
                    <li><Link to="/review">Review</Link> </li>
                    <li> <Link to="/contact">Contact</Link></li>
                    <li><button onClick={handleLogout} className='logout'>{authUser ? "Logout" : "Login"}</button></li>
                </div>
            </ul>
        </nav>
    )
}

export default NavBar;