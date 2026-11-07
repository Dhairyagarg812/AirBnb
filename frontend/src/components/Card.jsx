import { useState, useEffect, useContext } from "react";
import { Listingdata } from "../Context/listingContext";
import { usersContext } from "../Context/usersContext";
import { useNavigate } from "react-router";
import { MdStars } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

function Card({ props }) {
    let navigate=useNavigate()
    let{handleViewCard,cardDetail,setCardDetail}=useContext(Listingdata)
    let {userData}=useContext(usersContext)
    let [currentIndex, setCurrentIndex] = useState(0);
    let handleClick=()=>{
        if(userData){
            
            handleViewCard(props._id)
        }
        else{
            navigate("/login")
        }
    }

    let images = [
        props.image1,
        props.image2,
        props.image3
    ];

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div onClick={()=>!props.isBooked?handleClick():null} className="w-[300px] relative h-[400px] p-4 cursor-pointer rounded-lg hover:shadow-xl hover:w-[310px] text-white flex flex-col gap-2">
{props.isBooked?<div className="bg-green-400 flex gap-5 items-center  z-50 right-0 w-[50%] top-5 rounded-2xl h-[30px] absolute">

<SiTicktick className="ml-5"/>
<h2 className="text-white">Booked</h2>
</div>

:<div></div>}            <div className="bg-[#2e2d2d] overflow-hidden rounded-lg w-full h-[67%]">

                <div
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >
                    {images.map((image, index) => {
                        return (
                            <img
                                key={index}
                                src={image}
                                className="object-cover h-full w-full shrink-0"
                            />
                        );
                    })}
                </div>

            </div>
                   
             <div className="flex flex-col gap-3 text-black">

            <span className="text-ellipsis w-[80%] overflow-hidden font-semibold
            text-nowrap text-[#4a3434]">In {props.city.toUpperCase()},Near {props.landmark.toUpperCase()}</span>
            
            <span className="text-ellipsis text-[15px] w-[80%] overflow-hidden 
            text-nowrap ">{props.title.toUpperCase()}</span>
            <span className="text-ellipsis font-semibold text-[#986b6b] text-[16px] w-[80%]">Rs.{props.rent}/day</span>
            </div>
            

        </div>
    );
}

export default Card;