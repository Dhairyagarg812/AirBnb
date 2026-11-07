import { createContext, use, useContext, useEffect, useState } from "react";
import { userContext } from "./authContext";
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router";
export let Listingdata = createContext()

function ListingdataProvider({ children }) {
    const { serverUrl } = useContext(userContext)
    let[ai,setAi]=useState(false)

    let navigate = useNavigate()
    let [adding, setAdding] = useState(false)
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [filteredListingData, setFilteredListingData] = useState([])
    let [cardDetail, setCardDetail] = useState(null)
    let [frontEndImage1, setFrontEndImage1] = useState("");
    let [frontEndImage2, setFrontEndImage2] = useState("");
    let [frontEndImage3, setFrontEndImage3] = useState("");
    let[updating,setUpdating]=useState(false)
    let [backEndImage1, setBackEndImage1] = useState(null);
    let [backEndImage2, setBackEndImage2] = useState(null);
    let [backEndImage3, setBackEndImage3] = useState(null);

    let [rent, setRent] = useState("");
    let [city, setCity] = useState("");
    let [landmark, setLandmark] = useState("");
    let [category, setCategory] = useState("");
    let [listingData, setListingData] = useState([])

    const handleGetListing = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/listing/get`, { withCredentials: true })
            console.log(result.data);
            setListingData(result.data)
            setFilteredListingData(result.data)
        }
        catch (err) {
            console.log("Error in handleGetListing" + err)
        }
    }
    useEffect(() => {
        handleGetListing()
    }, [adding,updating])

    const handleViewCard = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, { withCredentials: true })
            setCardDetail(result.data); navigate("/viewcard")
            console.log(cardDetail)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleAddListing = async (req, res) => {
        setAdding(true)
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
            const result = await axios.post(`${serverUrl}/api/listing/add`, formData, { withCredentials: true })
            console.log(result)
            setAdding(false)
            navigate("/")
            setBackEndImage1("")
            setBackEndImage2("")
            setBackEndImage3("")
            setFrontEndImage1("")
            setFrontEndImage2("")
            setFrontEndImage3("")
            setTitle("")
            setCategory("")
            setRent("")
            setDescription("")
            setCity("")
            setLandmark("")
            toast.success("Listing Added Successfully")
        } catch (err) {
            setAdding(false)

            console.log(err);
            console.log(err.response?.data);

            toast.error(
                err.response?.data?.message || "Error in adding listing"
            );
        }
    }
    let value = {
        title, setTitle,
        description, setDescription,
        filteredListingData, setFilteredListingData,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,

        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        cardDetail,setCardDetail,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
        category, setCategory,
        adding, setAdding,
        listingData, setListingData,
        handleAddListing,
        handleViewCard,
        handleGetListing,
        updating,setUpdating,
        ai,setAi
    };

    return (<Listingdata.Provider value={value}>
        {children}
    </Listingdata.Provider>)

}
export default ListingdataProvider;