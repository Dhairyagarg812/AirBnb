import Navbar from "../components/Navbar"
import { Listingdata } from "../Context/listingContext"
import { useContext, useState } from "react"
import Card from "../components/Card"
import Gemini from "./Gemini.jsx"
import { DiMagento } from "react-icons/di";


function Home(){
    let{listingData,setListingData,setFilteredListingData,filteredListingData,ai,setAi}=useContext(Listingdata)
    return(<div className="relative flex flex-col items-center justify-center">
        <Navbar className=""/>
        <div className="w-[100vw] flex items-center justify-center
        gap-[25px] flex-wrap mt-[25px] md:mt-[18px]
        ">{filteredListingData.map((list)=>{
            return <div key={list._id}><Card props={list}/></div> 
        })}</div>
        
{
        !ai?<div onClick={()=>setAi(true)} className="cursor-pointer shadow-gray-400 shadow- hover:shadow-lg fixed bottom-5 flex items-center justify-center flex-col bg-red-500 p-5 text-white rounded-full right-10">
            <DiMagento  className="text-2xl" />
            <h1>Ask Ai</h1>

        </div>:
        <Gemini  />
}
    </div>)
}
export default Home