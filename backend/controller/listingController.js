import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listingModel.js";
import User from "../model/userModel.js";
export const  addListing=async(req,res)=>{
    try{
        let host=req.userId;
        let {title,description,city,rent,landmark,category}=req.body;
        let image1=await uploadOnCloudinary(req.files.image1[0].path);
        let image2=await uploadOnCloudinary(req.files.image2[0].path);

        let image3=await uploadOnCloudinary(req.files.image3[0].path);
        let listing=await Listing.create({title,description,host
            ,image1,image2,image3,rent,city,landmark,category
        })
        let user=await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true})
        if(!user)       return  res.status(401).json({message:"user not found"})

        return  res.status(201).json(listing)
    }   
    catch(err){
        res.status(400).json({message:"Listing contoller error->"+err})

    }
}

export const getListing=async(req,res)=>{
    try{
        const listings=await Listing.find().sort({createdAt:-1})
        return res.status(200).json(listings)
    }
    catch(err){
        return res.status(400).json({message:"Error in getListing->"+err})
    }
}


export const findListing = async (req, res) => {
    try {
      let listingDetail = await Listing.findById(req.params.id)
  
      if (!listingDetail) {
        return res.status(404).json({
          message: "Listing doesn't exist"
        })
      }
  
      return res.status(200).json(listingDetail)
    }
    catch (err) {
      return res.status(400).json({
        message: "Error in findListing -> " + err.message
      })
    }
  }


  export const updateListing = async (req, res) => {
    try {
      let { id } = req.params;
      let { title, description, city, rent, landmark, category } = req.body;
  
      let image1 = req.files?.image1?.[0]
        ? await uploadOnCloudinary(req.files.image1[0].path)
        : undefined;
  
      let image2 = req.files?.image2?.[0]
        ? await uploadOnCloudinary(req.files.image2[0].path)
        : undefined;
  
      let image3 = req.files?.image3?.[0]
        ? await uploadOnCloudinary(req.files.image3[0].path)
        : undefined;
  
      let updateData = {
        title,
        description,
        city,
        rent,
        landmark,
        category
      };
  
      if (image1) updateData.image1 = image1;
      if (image2) updateData.image2 = image2;
      if (image3) updateData.image3 = image3;
  
      let listing = await Listing.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
  
      return res.status(200).json(listing);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Problem occurred while updating listing"
      });
    }
  };
  
export const deleteListing=async(req,res)=>{
  try{
    let id=req.params.id
  let listing=await Listing.findByIdAndDelete(id)
  return res.status(200).json({message:"Listing Deleted Successfully"})
  }
  catch(err){
    return res.status(402).json({message:"Listing Deletion Error"})

  }
  
}

export const ratingListing = async (req, res) => {
  try {
      let { id } = req.params;
      let { ratings } = req.body;

      console.log("Received rating:", ratings);
      console.log("Request body:", req.body);
      let listing = await Listing.findById(id);

      if (!listing) {
          return res.status(404).json({
              message: "listing not found"
          });
      }
      if(!listing.rating){
      listing.rating = Number(ratings);}
      else{
        listing.rating=(listing.rating+Number(ratings))/2
      }

      await listing.save();

      return res.status(200).json({
          ratings: listing.rating
      });

  } catch (error) {
    return res.status(500).json({ message: error.message });
}
};

export const search = async (req, res) => {
  try {
      const { query } = req.body;

      if (query=="") {
          return res.status(400).json({
              message: "Search query is required"
          });
      }

      const listing = await Listing.find({
          $or: [
              { landmark: { $regex: query, $options: "i" } },
              { city: { $regex: query, $options: "i" } },
              { title: { $regex: query, $options: "i" } },
          ],
      });

      return res.status(200).json(listing);

  } catch (error) {
      return res.status(500).json({
          message: error.message
      });
  }
};