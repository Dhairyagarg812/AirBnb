import { useContext, useState } from 'react'

import './index.css'
import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Toaster } from "react-hot-toast";
import ListingPage1 from './pages/ListingPage1.jsx'
import ListingPage2 from './pages/ListingPage2.jsx'
import ListingPage3 from './pages/ListingPage3.jsx'
import { usersContext } from './Context/usersContext.jsx'
import Navbar from './components/Navbar.jsx'
import ViewCard from './pages/ViewCard.jsx'
import MyBooking from './pages/MyBooking.jsx'
import Booked from './pages/Booked.jsx'
function App() {
  let{userData}=useContext(usersContext)
  return(
    <>
    <Toaster/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/listingpage1" element={userData==null?<Navigate to="/login"/>:<ListingPage1/>}/>
    <Route path="/listingpage2" element={!userData==null?<Navigate to="/login"/>:<ListingPage2/>}/>
    <Route path="/listingpage3" element={!userData==null?<Navigate to="/login"/>:<ListingPage3/>}/>
    <Route  path="/viewcard" element={!userData?<Navigate to="/login"/>:<ViewCard/>} />
    <Route path="/mybooking" element={<MyBooking/>}/>
  <Route path="/booking" element={<Booked/>} />
  </Routes>
  </>
)
}

export default App
