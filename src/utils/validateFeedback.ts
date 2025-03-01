import mongoose from "mongoose";
import {z} from "zod";

const feedbackValidationSchema= z.object({
    organizationId:z.string().refine((val)=>mongoose.isValidObjectId(val),{message:"Must be a valid mongodb id"}),
    volunteerId:z.string().refine((val)=>mongoose.isValidObjectId(val),{message:"Must be a valid object id"}),
    delivery:z.number().int().min(1,{message:"must be a value 1-5"}).max(5,{message:"must be a value 1-5"}),
    responsiveness:z.number().int().min(1,{message:"must be a value 1-5"}).max(5,{message:"must be a value 1-5"}),
    friendlyness:z.number().int().min(1,{message:"must be a value 1-5"}).max(5,{message:"must be a value 1-5"}),
    dateSubmitted:z.date().refine(val=>val>= new Date(new Date().setHours(0,0,0,0)),{message:"Date must be today or a future date"}).default(new Date()),
    comments:z.string().min(1,{message:"comments field should not be empty"})
}).strict();

 export const feebackUpdateValidationSchema=z.object({

    rating:z.number().int().min(1,{message:"must be a value 1-5"}).max(5,{message:"must be a value 1-5"}),
    dateSubmitted:z.date().refine(val=>val>= new Date(new Date().setHours(0,0,0,0)),{message:"Date must be today or a future date"}).default(new Date()),
    comments:z.string().min(1,{message:"comments field should not be empty"})
}).strict();

export  default feedbackValidationSchema;