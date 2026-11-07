import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { Listingdata } from '../Context/listingContext';
// LISTING FILE WATCH TEST 
// LISTING FILE WATCH TEST 123 
console.log("LISTING FILE LOADED 435");
const ListingPage1 = () => {
  const navigate = useNavigate()

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
    landmark, setLandmark
  } = useContext(Listingdata)
  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
  }
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
  }
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
  }
  return (
    <div className='w-full   h-full relative bg-white flex items-center justify-center'>
      <div className="flex items-center justify-center fixed text-3xl top-[40px] left-[20px] bg-red-500 p-2 rounded-full">
        <FaArrowLeft
          className="text-white cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="flex shadow-lg text-white cursor-pointer items-center justify-center fixed text-xl px-4 py-2 top-[40px] right-[40px] bg-red-400 rounded-full">
        SetUp Your Home
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        navigate('/listingpage2')
      }} className=" mt-[100px] mb-[50px] overflow-auto  h-[80vh]   flex flex-col items-center justify-start">
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='title' className="mt-[30px]  text-[18px]">Title</label>
          <input id="title" placeholder='_bhk ' value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="border-[2px] required overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
        </div>
        <div className=' flex flex-col gap-2'>
          <label htmlFor='description' className="mt-[30px] text-[18px]">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="border-[2px] overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[80px]  min-w-[50vw] w-[90%] p-[10px]"></textarea>
        </div>
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='frontendImage1' className="mt-[30px]  text-[18px]">Image1</label>
          <div className="border-[2px] flex items-center  ] border-gray-500  h-[40px]  min-w-[50vw] w-[90%] p-[10px]">
            <input required  onChange={handleImage1}
              id="frontendImage1"
              type="file"
              className="w-full file:border-[1px] file:bg-gray-300 file:border-0 file:px-3  file:mr-3"
            />
          </div>
        </div>
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='frontendImage2' className="mt-[30px]  text-[18px]">Image2</label>
          <div className="border-[2px]  flex items-center  ] border-gray-500  h-[40px]  min-w-[50vw] w-[90%] p-[10px]">
            <input required  onChange={handleImage2}
              id="frontendImage2"
              type="file"
              className="w-full file:border-[1px] file:bg-gray-300 file:border-0 file:px-3  file:mr-3"
            />
          </div>
        </div>
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='frontendImage3' className="mt-[30px]  text-[18px]">Image3</label>
          <div className="border-[2px] flex items-center  ] border-gray-500  h-[40px]  min-w-[50vw] w-[90%] p-[10px]">
            <input required  onChange={handleImage3}
              id="frontendImage3"
              type="file"
              className="w-full file:border-[1px] file:bg-gray-300 file:border-0 file:px-3  file:mr-3"
            />
          </div>
        </div>
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='rent' className="mt-[30px]  text-[18px]">Rent</label>
          <input required placeholder='Rs.______/day' value={rent} onChange={(e) => setRent(e.target.value)} id="rent" type="number" className="border-[2px] overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
        </div>
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='city' className="mt-[30px]  text-[18px]">City</label>
          <input required placeholder='eg.Delhi'  value={city} onChange={(e) => setCity(e.target.value)} id="city" type="text" className="border-[2px] overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
        </div>
        <div className=' flex flex-col  gap-2'>
          <label htmlFor='landmark' className="mt-[30px]  text-[18px]">Landmark</label>
          <input placeholder='Near_____'   value={landmark} onChange={(e) => setLandmark(e.target.value)} id="landmark" type="text" className="border-[2px] overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
        </div>
        <div className='flex items-start justify-start'>
          <button type="submit" className="cursor-pointer bg-red-500 w-[200px] mt-4 mb-2 text-lg text-white rounded-2xl h-[70px]">Next</button>
        </div>
      </form>
    </div>
  )
}

export default ListingPage1