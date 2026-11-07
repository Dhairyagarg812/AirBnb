
import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { Listingdata } from '../Context/listingContext';

const ListingPage3 = () => {

  let {
    title, setTitle,
    description, setDescription,

    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,

    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,

    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    handleAddListing,
    adding ,setAdding

  } = useContext(Listingdata)

  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen relative flex-col bg-white flex gap-[20px] items-center justify-center'>

      {/* Back Button */}
      <div className="fixed top-[40px] left-[20px] h-[48px] w-[48px] flex items-center justify-center bg-red-500 rounded-full">
        <FaArrowLeft
          className="text-white cursor-pointer"
          onClick={() => navigate('/listingpage2')}
        />
      </div>

     
      
      <div className='w-[60%] md:w-[50%] text-3xl flex items-start justify-start'>
      <h1 >IN {city.toUpperCase()} AND NEAR {landmark.toUpperCase()}</h1>
      </div>

      <div className='w-[70%] border-[3px] border-gray-600  md:w-[50%] h-[50vh] md:h-[50vh] flex items-center justify-center max-md:flex-col bg-black'>

        {/* First Image */}
        <div className='w-full md:w-[60%] h-[60%] md:h-full'>
          {frontEndImage1 && (
            <img
              src={frontEndImage1}
              className='w-full h-full object-cover'
            />
          )}
        </div>

        {/* Second and Third Images */}
        <div className='flex md:flex-col w-full md:w-[40%] h-[40%] md:h-full'>

          {/* Second Image */}
          <div className='w-[50%] md:w-full h-full md:h-[50%]'>
            {frontEndImage2 && (
              <img
                src={frontEndImage2}
                className='w-full h-full object-cover'
              />
            )}
          </div>

          {/* Third Image */}
          <div className='w-[50%] md:w-full h-full md:h-[50%]'>
            {frontEndImage3 && (
              <img
                src={frontEndImage3}
                className='w-full h-full object-cover'
              />
            )}
          </div>

        </div>

      </div>
      <div className='w-[70%] md:w-[50%] text-xl flex items-start justify-start'>
      <h1>{title.toUpperCase()} NEAR {landmark.toUpperCase()} , {city.toUpperCase()}</h1>
      </div>
      
      <div className='w-[70%] md:w-[50%] text-xl flex items-start justify-start'>
      <h1>{description.toUpperCase()}</h1>
      </div>
      <div className='w-[70%] md:w-[50%] text-xl flex items-start justify-start'>
      <h1>Rs.{rent}/Day </h1>
      </div>
            <div className='w-[70%] md:w-[50%] flex justify-start items-start'>
      <button
        disabled={!frontEndImage1 ||adding || !frontEndImage2 || !frontEndImage3}
        onClick={handleAddListing} 
        className="rounded-2xl h-[50px] cursor-pointer bg-red-500 flex items-center justify-center shadow-lg text-white text-xl px-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {!adding?"Add Listing":"Adding..."}
       
      </button>
      </div>

    </div>
  )
}

export default ListingPage3
