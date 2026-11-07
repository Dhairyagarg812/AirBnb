import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import UserContextProvider from './Context/authContext.jsx'
import UsersContextProvider from './Context/usersContext.jsx'
import ListingdataProvider from './Context/listingContext.jsx'
import BookingContextProvider from './Context/BookingContext.jsx'
console.log("MAIN.JSX UPDATED 3");
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
            <UserContextProvider>
                <UsersContextProvider>
                    <ListingdataProvider>
                        <BookingContextProvider>
                        <App />
                        </BookingContextProvider>
                    </ListingdataProvider>
                </UsersContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    </StrictMode>
)
