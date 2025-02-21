import { useState } from "react"
import { toast } from "react-hot-toast";
import { getUserContext } from "../context/userContext";

export const singupHook = () =>{
    const [Loading, setLoading] = useState(false);
    const {authUser ,setauthUser} = getUserContext();
    async function signup({username, email, password, confirmPassword}){
        const valid = validate({username, email, password, confirmPassword});
        if(!valid){
            return;
        }
        setLoading(true);
        try{
            const response = await fetch("http://localhost:3000/user/register", {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username, email, password}),
                credentials: "include"
            });
            const data = await response.json();
           
            if(data.error){
                toast.error(data.error);
            }
            else{
                toast.success(data.message);
                localStorage.setItem("authUser", JSON.stringify(data.user));
                setauthUser(data.user);
            }
        }
        catch(err){
            console.log(err);
            toast.error("Something went wrong");
    
        }
        finally{
            setLoading(false);
        }
    }
    return {signup, Loading} ;
}

function validate({username, email, password, confirmPassword}){
    if(!username || !email || !password || !confirmPassword){
        
        toast.error("Please fill all the fields");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }
    return true;
}