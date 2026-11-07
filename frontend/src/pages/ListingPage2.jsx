
import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { MdApartment, MdPool, MdBedroomParent, MdBroadcastOnHome } from "react-icons/md";
import { TbBedFlatFilled } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { Listingdata } from '../Context/listingContext';

const ListingPage2 = () => {
  let { category, setCategory } = useContext(Listingdata)

  const navigate = useNavigate()

  return (
    <div className='w-full h-full relative bg-white flex gap-[20px] flex-col items-center justify-center'>

      {/* Back Button */}
      <div className="fixed top-[40px] left-[20px] h-[48px] w-[48px] flex items-center justify-center bg-red-500 rounded-full">
        <FaArrowLeft
          className="text-white cursor-pointer"
          onClick={() => navigate('/listingpage1')}
        />
      </div>

      {/* Next Button */}
      <button disabled={!category
      }
        onClick={() => navigate('/listingpage3')}
        className="fixed top-[40px] right-[20px] rounded-2xl h-[50px] cursor-pointer bg-red-500 flex items-center justify-center shadow-lg text-white text-xl px-4"
      >
        Next
      </button>

      {/* Heading */}
      <div className='sm:ml-0 ml-5'>
        <h1 className='mt-[100px] text-xl md:mt-[200px]'>
          Which Of The Above Describe Your Category Best?
        </h1>
      </div>

      {/* Categories */}
      <div className="max-w-[900px] w-[100%] lg:w-[40%] lg:h-[400px] h-[200px] flex flex-wrap items-center gap-[40px] justify-center">

        {/* Apartment */}
        <div
          onClick={() => setCategory("apartment")}
          className={`w-[150px] flex items-center justify-center h-[100px] ${category === "apartment" ? "border-red-500" : "border-gray-200"
            } border-[2px] cursor-pointer hover:border-gray-500`}
        >
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <MdApartment className="text-2xl" />
            <h2>Apartment</h2>
          </div>
        </div>

        {/* Pool House */}
        <div
          onClick={() => setCategory("pool")}
          className={`w-[150px] flex items-center justify-center h-[100px] ${category === "pool" ? "border-red-500" : "border-gray-200"
            } border-[2px] cursor-pointer hover:border-gray-500`}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <MdPool className="text-2xl" />
            <h2>Pool House</h2>
          </div>
        </div>

        {/* Rooms */}
        <div
          onClick={() => setCategory("rooms")}
          className={`w-[150px] h-[100px] flex items-center justify-center ${category === "rooms" ? "border-red-500" : "border-gray-200"
            } border-[2px] cursor-pointer hover:border-gray-500`}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <MdBedroomParent className="text-2xl" />
            <h2>Rooms</h2>
          </div>
        </div>

        {/* Flats */}
        <div
          onClick={() => setCategory("flats")}
          className={`w-[150px] h-[100px] flex items-center justify-center ${category === "flats" ? "border-red-500" : "border-gray-200"
            } border-[2px] cursor-pointer hover:border-gray-500`}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <TbBedFlatFilled className="text-2xl" />
            <h2>Flats</h2>
          </div>
        </div>

        {/* PG */}
        <div
          onClick={() => setCategory("pg")}
          className={`w-[150px] h-[100px] flex items-center justify-center ${category === "pg" ? "border-red-500" : "border-gray-200"
            } border-[2px] cursor-pointer hover:border-gray-500`}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <MdBroadcastOnHome className="text-2xl" />
            <h2>PG</h2>
          </div>
        </div>

        {/* Houses */}
        <div
          onClick={() => setCategory("houses")}
          className={`w-[150px] h-[100px] flex items-center justify-center ${category === "houses" ? "border-red-500" : "border-gray-200"
            } border-[2px] cursor-pointer hover:border-gray-500`}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <IoHome className="text-2xl" />
            <h2>Houses</h2>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ListingPage2
