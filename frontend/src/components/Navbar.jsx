import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdWhatshot } from "react-icons/md";
import { MdApartment } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { TbBedFlatFilled } from "react-icons/tb";
import { MdBroadcastOnHome } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { MdOutlineVilla } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react";
import { toast } from "react-hot-toast"
import UserContextProvider, { userContext } from "../Context/authContext";
import { usersContext } from "../Context/usersContext";
import { Listingdata } from "../Context/listingContext";
function Navbar() {
  let [cate, setCate] = useState("")
  let { listingData, setListingData, filteredListingData, setFilteredListingData } = useContext(Listingdata)
  const handleCategory = (categor) => {
    setCate(categor)
    if (categor == "") {
      setFilteredListingData(listingData)
    }

    else {
      setFilteredListingData(listingData.filter((list) => {
        return list.category == categor
      }))
    }
  

  }
  const handleMyListing = (userId) => {
    setCate("")
    console.log(cate); console.log(listingData)
    setFilteredListingData(listingData.filter((list) => {
      return list.host == userId
    }))
  }
  let [hidden, setHidden] = useState(false)
  let navigate = useNavigate()
  let { serverUrl } = useContext(userContext)
  let { userData, setUserData } = useContext(usersContext)
  let [searchVal,setSearchVal]=useState("")
  const handleLogout = async () => {
    try {
      let result = await axios.post(`${serverUrl}/api/auth/logout`, {}
        , { withCredentials: true }
      )
      setUserData(null)
      toast.success("Logout Sucessfull!!!")
      navigate("/login")
      setHidden(!hidden)

    }
    catch (err) {
      console.log("error in logout" + err)
    }
  }

  const handleSearch = async (e,query) => {
    if (e.key === "Enter") {
        try {
            let result = await axios.post(
                `${serverUrl}/api/listing/search`,{query},
                {withCredentials:true}
            );
            setFilteredListingData(result.data)
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }
};

const handleSearch2 = async (query) => {
  if (!query.trim()) {
    setFilteredListingData(listingData);
    return;
}
      try {
          let result = await axios.post(
              `${serverUrl}/api/listing/search`,{query},
              {withCredentials:true}
          );
          setFilteredListingData(result.data)
          console.log(result.data);
      } catch (error) {
          console.log(error);
      }
  
};

  return (
    <div className=" ">
      <div className="border-b-fuchsia-50  border-b-2 justify-between flex items-center max-w-[100vw] min-h-[80px]">
        <img className="h-[100px]   lg:w-1/8 w-[120px] p-2" src="image.png" />
        <div className="relative">
          <div className="relative flex justify-between md:w-[700px] w-[200px] mr-[20px] items-center gap-3 border-2 rounded-2xl border-gray-400 p-2">

            <input onKeyDown={(e)=>handleSearch(e,searchVal)} value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)
              handleSearch2(e.target.value)
            }} className=" focus:outline-none w-full pl-4 text-xl" type="text" placeholder="Any where | Any city | Any location"></input>
            <div onClick={()=>handleSearch2(searchVal)} className=" bg-red-500 rounded-full p-2">
              <IoIosSearch  className="cursor-pointer text-2xl text-white" /></div>
          </div>
          {hidden && (
            <div className="absolute z-[9999] right-[10%] lg:left-[100%] left-[60%] top-full mt-2 bg-gray-100 md:w-[250px] w-[150px] h-[250px] md:h-[350px] shadow-lg rounded-l-2xl rounded-b-2xl border border-gray-200 z-50">
              {/* Dropdown content */}
              <ul className="w-[100%] h-[100%] cursor-pointer text-[17px] flex items-start justify-around flex-col py-[10px]">
                {userData ? <li onClick={handleLogout

                } className="w-[100%] px-[15px] py-[10px] hover:bg-[#696767]">
                  Logout
                </li> : <li onClick={() => {
                  navigate('/login')
                  setHidden(false)
                }} className="w-[100%] px-[15px] py-[10px] hover:bg-[#696767]">
                  Login
                </li>}


                <div className="h-[1px] w-full border-1  border-gray-300"></div>
                <li onClick={() => {
                  setHidden(false)
                  navigate("/listingpage1")
                }} className="w-[100%] px-[15px] py-[10px] hover:bg-[#696767]">
                  List your Home
                </li>

                <li onClick={() => {
                  setHidden(false)
                  handleMyListing(userData._id)
                }
                } className="w-[100%] px-[15px] py-[10px] hover:bg-[#696767]">
                  My Listing
                </li>

                <li onClick={() =>{
                  navigate('/mybooking')
                  setHidden(false)}} className="w-[100%] px-[15px] py-[10px] hover:bg-[#696767]">
                  My Booking
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex gap-4 pr-4 items-center text-xl">
          <h2 onClick={() => navigate("/listingpage1")} className="hidden lg:block hover:bg-gray-400 p-4 rounded-2xl cursor-pointer">List Your Home</h2>
          <button onClick={() => setHidden(!hidden)} className="cursor-pointer flex gap-2 border-gray-400 hover:shadow-lg  items-center p-4 border-2 rounded-2xl">
            {!userData ? <CgProfile className="text-2xl" /> : <div className="rounded-2xl text-white bg-black w-[30px] h-[30px]">{userData.name.slice(0, 1).toUpperCase()}</div>}
            <IoReorderThreeOutline className="text-3xl" /></button>
        </div>
      </div>

      <div className="flex w-[100%]    max-sm:ml-[10%] justify-center  items-center md:gap-10 gap-4  p-4">
        <div onClick={() => handleCategory("")} className={` ${cate == "" ? "border-[1px]" : "border-0"}  border-red-600 p-2  cursor-pointer flex flex-col items-center`}>
          <MdWhatshot className="text-2xl" />
          <h2>Trending</h2>
        </div>
        <div onClick={() => handleCategory("apartment")} className={` ${cate == "apartment" ? "border-[1px]" : "border-0"} border-red-600 p-2 flex flex-col cursor-pointer items-center`}>
          <MdApartment className="text-2xl" />
          <h2>Apartment</h2>
        </div>
        <div onClick={() => handleCategory("pool")} className={` ${cate == "pool" ? "border-[1px]" : "border-0"} border-red-600 p-2 flex flex-col cursor-pointer items-center`}>
          <MdPool className="text-2xl" />
          <h2>Pool House</h2>
        </div>
        <div onClick={() => handleCategory("rooms")} className={` ${cate == "rooms" ? "border-[1px]" : "border-0"} border-red-600 p-2 flex flex-col cursor-pointer items-center`}>
          <MdBedroomParent className="text-2xl" />
          <h2>Rooms</h2>
        </div>
        <div onClick={() => handleCategory("flats")} className={` ${cate == "flats" ? "border-[1px]" : "border-0"} border-red-600 p-2 flex flex-col cursor-pointer items-center`}>
          <TbBedFlatFilled className="text-2xl" />
          <h2>Flats</h2>
        </div>
        <div onClick={() => handleCategory("pg")} className={` ${cate == "pg" ? "border-[1px]" : "border-0"} border-red-600 p-2 flex flex-col cursor-pointer items-center`}>
          <MdBroadcastOnHome className="text-2xl" />
          <h2>PG</h2>
        </div>
        <div onClick={() => handleCategory("houses")} className={` ${cate == "houses" ? "border-[1px]" : "border-0"} border-red-600 p-2 flex flex-col cursor-pointer items-center`}>
          <IoHome className="text-2xl" />
          <h2>Houses</h2>
        </div>

      </div>
    </div>

  )
}
export default Navbar