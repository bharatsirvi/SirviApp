import Business from "../models/businessModel.js";
import { throwError } from "../util/error.js";

const getAllBusinesses = async (req, res, next) => {
  const { name, category, owner_name, location } = req.query;
  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `.*${name}.*`, $options: "i" };
    }
    if (category) {
      filterQuery.category = { $regex: `.*${category}.*`, $options: "i" };
    }

    if (owner_name) {
      filterQuery.owner_names = { $regex: `.*${owner_name}.*`, $options: "i" };
    }
    if (location) {
      filterQuery.location = { $regex: `.*${location}.*`, $options: "i" };
    }
    const businesses = await Business.find(filterQuery);
    if (!businesses) {
      return res.status(404).json({ error: "No businesses found" });
    }
    res.status(201).json(businesses);
  } catch (error) {
    throwError(next, error);
  }
};

const getBusinessById = async(req, res,next) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
        res.status(200).json(business);
    } catch (error) {
        throwError(next, error);
    }
};

const createBusiness = async(req, res,next) => {
   try {
    const newBusiness = new Business(req.body);
    if (!newBusiness) return res.status(404).json({ error: "Business not created" });
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
}
catch (error) {
    throwError(next, error);    
};
}

const updateBusiness = async(req, res,next) => {
    try {
        const  businessId = req.params.id;
        const businessExists = await Business.findById(businessId);
        if (!businessExists) {
          return res.status(404).json({ error: error.message });
        }
        const updatedBusiness = await Business.findByIdAndUpdate(businessId, req.body, {
          new: true,
        });
        res.status(200).json(updatedBusiness);
      } catch (error) {
        throwError(next, error);
      }
    };

const deleteBusiness = async( req , res , next) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }
        await Business.findByIdAndDelete(businessId);
        res.status(200).json({ message: "Business deleted successfully" });
    } catch (error) {
        throwError(next, error);
    }
};

export default {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
