import { NextFunction, Request,Response } from "express";
import FeebackRepository from "../repositories/feebackRepository";
import FeebackServices from "../services/feedbackServices";
import { IFeedback } from "../models/feedback";
import {omit, isEmpty, pick}from "lodash"
import { Jwt } from "../utils/jwtUtils";
import { Bcrypt } from "../utils/bcryptUtils";
import feedbackValidationSchema,{feebackUpdateValidationSchema} from "../utils/validateFeedback";
import { CustomRequest } from "../middlewares/Middlewares";
import VolunteerServices from "../services/volunteerServices";
import { VolunteerRepository } from "../repositories/volunteerRepository";

  export class FeedbackController {

  static async createFeeback(req:CustomRequest,res:Response,next:NextFunction):Promise<void>{
    const  Frepository= new FeebackRepository();
    const Fservice= new FeebackServices( Frepository);

    const VRepository=new VolunteerRepository();
    const Vservice= new VolunteerServices(VRepository);

     try {
      const {id}=req.params
      if(!id){
        res.status(400);
        throw new Error("Volunteer id is required")
      }
      const emptyBody=isEmpty(req.body);
      if(emptyBody){
        res.status(400);
        throw new Error('request body can not be empty')
      } 
      const user= req.user;
      if(!user){
        res.status(401);
        throw new Error("not Authenticated")
      }
      const feeback:IFeedback=user ?{...req.body,organizationId:user._id,volunteerId:id}:{...req.body}
    
      const validationResult=feedbackValidationSchema.safeParse(feeback);
      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
        res.status(400)
      throw new Error(`Validation failed: ${errorMessage}`);
      }  

        let volunteerExists= await Vservice.findVolunteer(id);
        if(!volunteerExists){
          res.status(400);
          throw new Error("User with the given id does not exists")
        }
       let doc:IFeedback|null =  await Fservice.createFeeback(feeback);

       if(!doc){
         throw new Error('Failed to create  a feeback')

       }
       const leanFeeback =omit(doc, ['__v']);
       res.status(201).json({
        status:'success',
        message:"feedback creation was successful",
        data:leanFeeback,
       })
      
     } catch (error) {
        next(error)
        
     }

}

static async updateFeedback(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{

  const repository= new FeebackRepository();
  const service= new FeebackServices( repository);
  try{
  const {id}= req.params;
  const user=req.user;

  if(!id){
    res.status(400)
    throw new Error('Id of a feeback is  required ');
  }
 const{volunteerId}=req.body;

   if(volunteerId){
    res.status(400)
     throw new Error('VolunteerId can not be updated');
   }
   const feeback:IFeedback|null= await service.findFeeback(id)

if(user?._id!== feeback?.organizationId){
    res.status(401)
    throw new Error("Unauthorized");
}

const validationResult=feebackUpdateValidationSchema.safeParse(feeback);
if(!validationResult.success){
  const errorMessage = validationResult.error.errors
  .map((err) => `${err.path.join(".")}: ${err.message}`)
  .join(", ");
  res.status(400)
throw new Error(`Validation failed: ${errorMessage}`);
}  

const updatedFeedback=await service.updateFeeback(req.body,id);

  res.status(201).json({
    status:"success",
    message:"The feedback was successfully  updated",
    data:omit(updatedFeedback,['_v'])
  })
     } catch (error) {
        next(error)
     }

}

 static  async deleteFeebak(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{

  const repository= new FeebackRepository();
  const  service= new FeebackServices( repository);
  try {
    const {id}= req.params;
    if(!id){
      res.status(400)
      throw new Error('Id of a user is  required ');
    }
    const user = req?.user;
    const feeback= await service.findFeeback(id);

    if(!feeback){
        res.status(400)
        throw new Error("feedback with the given id was not found!");
    }

    if(user?._id!==feeback?.organizationId){
      res.status(401)
     throw new Error("Unauthorized")
     }
   await  service.deleteFeeback(id);

   res.status(203).json({
    status:"success",
    message:"feeback was deleted successfully"
   })

  } catch (error) {
     next(error)
  }
 
 }

 static async findFeebackById(req:Request,res:Response,next:NextFunction):Promise<void>{
    const repository= new FeebackRepository();
    const  service= new FeebackServices( repository);
  try {
    const {id}= req.params;
    if(!id){
    res.status(400);
    throw new Error("Feedback Id is required");
    }
    const feeback= await service.findFeeback(id);
    if(!feeback){
        res.status(400);
        throw new Error("feeback with the given id was not found")
    }
    const leanFeeback=omit(feeback,['__v'])
    res.status(203).json({
      status:'success',
      data:leanFeeback
    })
  } catch (error) {
    next(error)
  }
 }

 static  async findAllFeebacks(req:Request,res:Response,next:NextFunction):Promise<void>{
    const repository= new FeebackRepository();
    const  service= new FeebackServices( repository);
   try {
      const query=req.query
      const feebackData= await service.findAllFeeback(query);
      const leanData= feebackData.map(v=>omit(v,['__v','password']));
     res.status(200).json({
      status:"success",
      data:leanData
     })
   } catch (error) {
     next(error);
   }

 }
 
}