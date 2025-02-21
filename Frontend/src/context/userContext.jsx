
import { createContext, useState ,useContext} from 'react';
const userContext = createContext();

export function getUserContext(){
    return useContext(userContext);
}

export default function UserContextProvider({children}){
    const [authUser, setauthUser] = useState(localStorage.getItem("authUser") || null);
    return(
        <userContext.Provider value={{authUser, setauthUser}}>
            {children}
        </userContext.Provider>
    )
}