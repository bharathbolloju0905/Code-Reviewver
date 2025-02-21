import { useState } from "react"
import { toast } from "react-hot-toast";
import { getUserContext } from "../context/userContext";

export const signInHook = () =>{
    const [Loading, setLoading] = useState(false);
    const {authUser ,setauthUser} = getUserContext();
    async function signIn({ email, password}){
        const valid = validate({ email, password});
        if(!valid){
            return;
        }
        setLoading(true);
        try{
            const response = await fetch("http://localhost:3000/user/login", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email, password}) ,
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
    return {signIn, Loading} ;
}

function validate({ email, password}){
    if( !email || !password ){
        
        toast.error("Please fill all the fields");
        return false;
    }
    return true;
}