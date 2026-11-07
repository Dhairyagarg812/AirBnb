import { createContext } from "react";

export const userContext=createContext();
function UserContextProvider({children}){
    let serverUrl="http://localhost:8000";
    let value={serverUrl}
    return(
        <>
        <userContext.Provider value={value}> 
        {children}
        </userContext.Provider>
        </> )
}
export default UserContextProvider