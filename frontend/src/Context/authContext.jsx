import { createContext } from "react";

export const userContext=createContext();
function UserContextProvider({children}){
    let serverUrl="https://airbnb-45gq.onrender.com";
    let value={serverUrl}
    return(
        <>
        <userContext.Provider value={value}> 
        {children}
        </userContext.Provider>
        </> )
}
export default UserContextProvider