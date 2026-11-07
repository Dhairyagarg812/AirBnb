import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { Listingdata } from '../Context/listingContext';
import { userContext } from '../Context/authContext';
import { usersContext } from '../Context/usersContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { MdStars } from "react-icons/md";

import { toast } from "react-hot-toast"
import { bookingContext } from '../Context/BookingContext';
function ViewCard() {
  let { checkin, setCheckin, handleBooking, checkout, setCheckout, total, setTotal, night, setNight } = useContext(bookingContext)

  let {
    serverUrl
  } = useContext(userContext)
  let { cardDetail, updating, setUpdating, isBooked } = useContext(Listingdata)

  let [title, setTitle] = useState(cardDetail.title);
  let [description, setDescription] = useState(cardDetail.description);

  let [backEndImage1, setBackEndImage1] = useState(cardDetail.image1);
  let [backEndImage2, setBackEndImage2] = useState(cardDetail.image2);
  let [backEndImage3, setBackEndImage3] = useState(cardDetail.image3);

  let [rent, setRent] = useState(cardDetail.rent);
  let [city, setCity] = useState(cardDetail?.city || "hi");
  let [landmark, setLandmark] = useState(cardDetail.landmark);
  let [category, setCategory] = useState(cardDetail.category)
  let [minDate, setMinDate] = useState("")
  let [showBooking, setShowBooking] = useState(true)
  useEffect(() => {
    let today = new Date().toISOString().split('T')[0]
    setMinDate(today)
  }, [])
  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file)
  }
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file)
  }
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file)
  }

  let navigate = useNavigate()
  let { userData, setUserData } = useContext(usersContext)
  let [showPopup, setShowPopup] = useState(false)
  let [showBookPopup, setShowBookPopup] = useState(false)
  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      let id = cardDetail._id
      let result = await axios.get(`${serverUrl}/api/listing/delete/${id}`, { withCredentials: true })
      toast.success("Listing Deleted Successfully")
      navigate('/')
      setUpdating(true)
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleUpdateListing = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);
      const result = await axios.post(`${serverUrl}/api/listing/update/${cardDetail._id}`, formData, { withCredentials: true })
      console.log(result)

      setBackEndImage1("")
      setBackEndImage2("")
      setBackEndImage3("")


      setTitle("")
      setCategory("")
      setRent("")
      setDescription("")
      setCity("")
      setLandmark("")
      toast.success("Listing Updated Successfully")
      setUpdating(true)
      navigate("/")
    }
    catch (err) {
      console.log("Error in Updating" + err)
      return err
    }
  }

  const handleClick = () => {
    try {
      if (userData._id == cardDetail.host) {
        setShowPopup(!showPopup)
        console.log(true)
      }
      else {
        setShowBookPopup(true)
        console.log(true)

      }
    }
    catch (err) {
      console.log(err)
    }
  }
  let [tax, setTax] = useState(0)
  let [misc, setMisc] = useState(0)

  useEffect(() => {
    if (checkin && checkout) {
      let inDate = new Date(checkin);
      let outDate = new Date(checkout);

      if (inDate >= outDate) {
        toast.error("Check-out date must greater than check-in date");
      }
      let n = (outDate - inDate) / (24 * 60 * 60 * 1000)
      setNight(n)
      let bnbCharge = cardDetail.rent * n;
      setTotal(bnbCharge)
      let tax = bnbCharge * 7 / 100
      let miscCharge = tax / n
      setTax(tax)
      setMisc(miscCharge)
    }
  }, [checkin, checkout]);
  return <div className='w-full min-h-screen relative flex-col bg-white flex gap-[20px] items-center justify-center'>

    {/* Back Button */}
    <div className="fixed top-[40px] left-[20px] h-[48px] w-[48px] flex items-center justify-center bg-red-500 rounded-full">
      <FaArrowLeft
        className="text-white cursor-pointer"
        onClick={() => navigate('/')}
      />
    </div>



    <div className='w-[60%] md:w-[50%] text-3xl flex items-start justify-between'>
      <h1 className="max-md:truncate" >IN {cardDetail.city.toUpperCase()} AND  {cardDetail.landmark.toUpperCase()}</h1>

    </div>

    <div className='w-[70%] border-[3px] border-gray-600  md:w-[50%] h-[50vh] md:h-[50vh] flex items-center justify-center max-md:flex-col bg-black'>

      {/* First Image */}
      <div className='w-full md:w-[60%] h-[60%] md:h-full'>
        {cardDetail.image1 && (
          <img
            src={cardDetail.image1}
            className='w-full h-full object-cover'
          />
        )}
      </div>

      {/* Second and Third Images */}
      <div className='flex md:flex-col w-full md:w-[40%] h-[40%] md:h-full'>

        {/* Second Image */}
        <div className='w-[50%] md:w-full h-full md:h-[50%]'>
          {cardDetail.image2 && (
            <img
              src={cardDetail.image2}
              className='w-full h-full object-cover'
            />
          )}
        </div>

        {/* Third Image */}
        <div className='w-[50%] md:w-full h-full md:h-[50%]'>
          {cardDetail.image3 && (
            <img
              src={cardDetail.image3}
              className='w-full h-full object-cover'
            />
          )}
        </div>

      </div>

    </div>
    <div className='w-[70%]  md:w-[50%] text-xl flex items-start justify-between'>
      <h1 className="md:truncate">{cardDetail.title.toUpperCase()} NEAR {cardDetail.landmark.toUpperCase()} , {cardDetail.city.toUpperCase()}</h1>
      <div className='flex justify-center items-center gap-1'><span>{cardDetail.rating}</span><MdStars className='text-xl' />
      </div>
    </div>

    <div className='w-[70%] md:text-md text-gray-600 md:w-[50%] text-xl flex items-start justify-start'>
      <h1 className="max-md:truncate">
        {cardDetail.description.toUpperCase()}
      </h1>
    </div>
    <div className='w-[70%] md:w-[50%] text-xl flex items-start justify-start'>
      <h1>Rs.{cardDetail.rent}/Day </h1>
    </div>
    <div className='w-[70%] md:w-[50%] flex justify-start items-start'>
      <button onClick={handleClick}

        className="rounded-2xl h-[50px] cursor-pointer bg-red-500 flex items-center justify-center shadow-lg text-white text-xl px-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {userData._id == cardDetail.host ? "Edit" : !cardDetail.isBooked ? "Reserve" : "Booked"}
      </button>
    </div>
    {showPopup &&(
      <div className="fixed inset-0 z-50 bg-[#000000c6] backdrop-blur-sm flex items-center justify-center p-4">

        <RxCross2
          onClick={() => setShowPopup(false)}
          className="cursor-pointer absolute text-5xl top-5 left-5 "
        />

        <form onSubmit={handleUpdateListing} className="relative w-full max-w-5xl max-h-[80vh] overflow-y-auto text-white bg-[#3d3939] rounded-xl p-6 flex flex-col items-center justify-start">

          {/* Your existing form fields go here */}
          <div className=' flex p-4 flex-col items-center justify-center  gap-2'>

            <label htmlFor='title' className=" mt-[30px]  text-[18px]">Title</label>
            <input id="title" placeholder='_bhk ' value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="border-[2px] bg-white text-black required overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
          </div>
          <div className=' flex flex-col gap-2'>
            <label htmlFor='description' className="mt-[30px] text-[18px]">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" type="text" className="bg-white border-[2px] text-black overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[80px]  min-w-[50vw] w-[90%] p-[10px]"></textarea>
          </div>
          <div className='max-md:ml-[40px] max-sm:ml-[0px] max-md:w-[70%] flex flex-col items-center justify-center w-full'>
            <div className=' flex flex-col  gap-2'>
              <label htmlFor='frontendImage1' className="mt-[30px]  text-[18px]">Image1</label>
              <div className="border-[2px] flex items-center  justify-center border-gray-500 text-black max-md:w-[] min-w-[50vw] w-[90%] ">
                <input onChange={handleImage1}
                  id="frontendImage1"
                  type="file"
                  className="w-full bg-white file:border-[1px]  h-full file:bg-gray-300 file:border-0 file:px-3  file:mr-3"
                />
              </div>
            </div>
            <div className=' flex flex-col  gap-2'>
              <label htmlFor='frontendImage2' className="mt-[30px]  text-[18px]">Image2</label>
              <div className="border-[2px]  flex items-center  text-black border-gray-500  h-[100%]  min-w-[50vw] w-[90%] ">
                <input onChange={handleImage2}
                  id="frontendImage2"
                  type="file"
                  className="w-full bg-white file:border-[1px] file:bg-gray-300 file:border-0 file:px-3  file:mr-3"
                />
              </div>
            </div>

            <div className=' flex flex-col  gap-2'>
              <label htmlFor='frontendImage3' className="mt-[30px]  text-[18px]">Image3</label>
              <div className="border-[2px] flex items-center  ] border-gray-500  text-black  h-full min-w-[50vw] w-[90%] ">
                <input onChange={handleImage3}
                  id="frontendImage3"
                  type="file"
                  className="bg-white w-full file:border-[1px] file:bg-gray-300 file:border-0 file:px-3  file:mr-3"
                />
              </div>
            </div>
          </div>
          <div className=' flex flex-col  gap-2'>
            <label htmlFor='rent' className="mt-[30px]  text-[18px]">Rent</label>
            <input value={rent} onChange={(e) => setRent(e.target.value)} required placeholder='Rs.______/day' id="rent" type="number" className="text-black bg-white border-[2px] overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
          </div>
          <div className=' flex flex-col  gap-2'>
            <label htmlFor='city' className="mt-[30px]  text-[18px]">City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} required placeholder='eg.Delhi' id="city" type="text" className="border-[2px] bg-white text-black overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
          </div>
          <div className=' flex flex-col  gap-2'>
            <label htmlFor='landmark' className="mt-[30px]  text-[18px]">Landmark</label>
            <input value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder='Near_____' id="landmark" type="text" className="border-[2px] text-black bg-white overflow-auto focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
          </div>
          <div className="mt-3 gap-[20px] max-md:w-[70%] max-sm:w-full  flex flex-row justify-between w-[50%]">
            <button
              type="submit"
              className="cursor-pointer bg-red-500  w-[200px] p-4 mt-4 mb-2 text-lg text-white rounded-2xl h-[70px]"
            >
              Update
            </button>

            <button onClick={handleDelete}
              type="button"
              className="cursor-pointer bg-red-500 w-[200px] p-4 mt-4 mb-2 text-lg text-white rounded-2xl h-[70px]"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    )}

    {showBookPopup &&  (



      <div className=' inset-0 gap-10 bg-white/40 backdrop-blur-sm z-[100] flex items-center justify-center absolute'>
        <RxCross2
          onClick={() => {
            setShowBookPopup(false)
            setShowBooking(true)
          }}
          className="cursor-pointer absolute text-5xl top-8 left-5 "
        />
        {showBooking && <form onSubmit={() => {
          !checkin ? toast.error("Enter Check-In Date") : !checkout ? toast.error("Enter Check-Out Date") : setShowBooking(false);
          ;


        }} className='max-w-[450px] rounded-2xl flex flex-col items-center  mt-[10px]  w-[90%] md:h-[400px] h-[500px] bg-[#f0f0f1ee]'>
          <h1 className='mt-[20px]  text-2xl'>Confirm & Book</h1>
          <div className=' m-[10px] w-full  h-[2px] bg-black'></div>
          <div className='bg-[#808085ee] rounded-2xl w-[80%] md:h-[250px] mt-[10px] h-[350px]'>
            <h1 className='p-[20px] text-lg  font-semibold'>Your Trip-</h1>
            <div className='flex items-center w-full justify-center'>
              <div className='flex md:flex-row flex-col gap-3 w-[100%] items-center md:w-full justify-center'>
                <label htmlFor='checkin' >CheckIn</label>
                <input required value={checkin} onChange={(e) => {
                  console.log(e.target.value)
                  setCheckin(e.target.value)
                }} min={minDate} className='border-[1px] focus:outline-none focus:ring-0 ml-3 rounded-lg p-[2px] ' id="checkin" type="date"></input>
              </div>
            </div>
            <div className='flex md:flex-row flex-col gap-3 w-[100%] mt-[30px]  items-center md:w-full justify-center'>
              <label htmlFor='checkout'>CheckOut</label>
              <input required value={checkout} onChange={(e) => {
                console.log(e.target.value)
                setCheckout(e.target.value)
              }} min={checkin + 1} className='focus:outline-none focus:ring-0  border-[1px] rounded-lg p-[2px] ' id="checkout" type="date"></input>
            </div>
            <div className='flex items-center justify-center w-full'>
              <button disabled={!checkin || !checkout || checkin >= checkout}
                type="submit"
                className="  mt-[30px] cursor-pointer bg-red-500  flex items-center justify-center p-4  mb-2 md:text-lg text-md text-white rounded-2xl  h-[45px] w-[120px] "
              >
                Next            </button>
            </div>
          </div>
        </form>}
        {!showBooking && <form className='max-w-[450px] rounded-2xl flex gap-4 flex-col items-center justif  mt-[10px]  w-[90%] md:h-[500px] h-[550px] bg-[#f0f0f1ee]'>
          <h1 className='mt-[20px]  text-2xl'>Booking Price </h1>
          <div className=' m-[10px] w-full  h-[2px] bg-black'></div>
          <div className='bg-[#808085ee] rounded-2xl w-[80%]  md:h-[350px] mt-[10px] h-[450px]'>
            <div className='flex md:mt-[0px] mt-[30px] items-center flex-col w-full gap-12 justify-center'>
              <div className='flex flex-col w-[80%] m-5 gap-6'>
                <div className='flex flex-row justify-between'>

                  <h1 className='text-lg'>{cardDetail.rent} x {night} Nights -</h1>
                  <h1>{(total).toFixed(2)}</h1>
                </div>

                <div className='flex flex-row  justify-between'>

                  <h1 className='text-lg'>TAX -</h1>
                  <h1>{(tax).toFixed(2)}</h1>
                </div>

                <div className='flex items-center flex-row justify-between'>

                  <h1 className='text-lg'>MISC CHARGES -</h1>
                  <h1>{(misc).toFixed(2)}</h1>
                </div>

              </div>
              <div className=' mt-[-50px] w-[90%] h-[2px] bg-black'></div>
              <div className='flex flex-row mt-[-30px] items-center w-[80%] justify-between'>

                <h1 className='text-lg'>TOTAL PRICE</h1>
                <h1>{(misc + tax + total).toFixed(2)}</h1>              </div>
            </div>


            <div className='flex items-center justify-center w-full'>
              <button
                type="button"
                onClick={() => { handleBooking(cardDetail._id) 
                  navigate("/booking")
                }}
                className="   mt-[40px] md:mt-[20px] cursor-pointer bg-red-500  flex items-center justify-center p-4  mb-2 md:text-lg text-md text-white rounded-2xl  h-[45px] w-[120px] "
              >
                Confirm            </button>
            </div>
          </div>
        </form>}
      </div>)}

  </div>
}
export default ViewCard
