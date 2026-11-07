import React, { useContext } from 'react'
import { Listingdata } from '../Context/listingContext'
import { usersContext } from '../Context/usersContext'
import Card from '../components/Card'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';

const MyBooking = () => {
    let navigate=useNavigate()
    let { listingData } = useContext(Listingdata)
    let { userData } = useContext(usersContext)
    return (
        <div className='flex   justify-center relative gap-[30px]  w-full h-full'>
            <div className="fixed absolute top-[40px] left-[20px] h-[48px] w-[48px] flex items-center justify-center bg-red-500 rounded-full">
      <FaArrowLeft
        className="text-white cursor-pointer"
        onClick={() => navigate('/')}
      />
    </div>
            <div className='flex mt-10   justify-center gap-[50px] flex-col'>
                <div className='text-4xl flex justify-center  max-sm:text-3xl mt-5'>
                    <h1>MY BOOKINGS</h1>
                </div>
                <div className='flex justify-center gap-[40px]'>{listingData.filter((item) => item.guest == userData._id).map((item) => <Card props={item} />)}</div>
            </div>
        </div>
    )
}

export default MyBooking