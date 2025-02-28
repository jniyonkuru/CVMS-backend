import { NextFunction, Request,Response } from "express";
import { OpportunityRepository } from "../repositories/opportunityRepository";
import OpportunityServices from "../services/opportunityServices";
import { IOpportunity } from "../models/opportunity";
import { CustomRequest } from "../middlewares/Middlewares";
import {omit, isEmpty}from "lodash"
import { OpportunityValidationSchema,UpdateOpportunityValidationSchema } from "../utils/opportunityValidation";

export class OpportunityController {

  static async createOpportunity(req:CustomRequest,res:Response,next:NextFunction):Promise<void>{
    const  repository= new OpportunityRepository();
    const service= new OpportunityServices( repository);
     try {
      const emptyBody=isEmpty(req.body);
     
      const user= req.user;
      if(emptyBody){
        res.status(400);
        throw new Error('request body can not be empty')
      } 
      if(!user){
    res.status(403);
     throw new Error("Unauthorized");
      }
      const {title}:IOpportunity=req.body
      const organizationId= user?._id;
      const  opportunityExists= await service.findAllOpportunities({organizationId,title});

      if(opportunityExists.length>0){
        res.status(400);
        throw new Error("Opportunity with the given title exists under this organization")
      }

      const validationResult= OpportunityValidationSchema.safeParse({...req.body,startDate:new Date(req.body.startDate),endDate:new Date(req.body.endDate)});
      if(!validationResult.success){
          const errorMessage = validationResult.error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        throw new Error(`Validation failed: ${errorMessage}`);
      }
  


       let  opportunity: Partial<IOpportunity>|null=  await service.createOpportunity({...req.body,organizationId});

       if(!opportunity){
         throw new Error('Failed to create opportunity')

       }
       opportunity =omit(opportunity, ['__v']);
       res.status(201).json({
        status:'success',
        message:"Opportunity creation was successful",
        data:opportunity
       })
      
     } catch (error) {
        next(error)
        
     }

}

static async updateOpportunity(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{
    const  repository= new OpportunityRepository();
    const service= new OpportunityServices( repository);
  try{
  const {id}= req.params;
  if(!id){
    res.status(400)
    throw new Error('Opportunity Id is  required ');
  }
  const user= req.user;
  if(!user){
      res.status(401)
       throw new Error("Unauthenticated")
  }
  const empty= isEmpty(req.body);
  if(empty){
    res.status(400);
    throw new Error("request can not be empty")
  }
 const opportunities= await service.findAllOpportunities({organizationId:user._id,_id:id});

 if(opportunities.length===0){
    res.status(400)
    throw new Error("Opportunity with given id for this organization was not found");
 }

 const validationResult= UpdateOpportunityValidationSchema.safeParse({...req.body,startDate:new Date(req.body.startDate),endDate:new Date(req.body.endDate)});
 if(!validationResult.success){
     const errorMessage = validationResult.error.errors
     .map((err) => `${err.path.join(".")}: ${err.message}`)
     .join(", ");
   throw new Error(`Validation failed: ${errorMessage}`);
 }


   const updateOpportunity:IOpportunity| null= await service.updateOpportunity(req.body,id);
   if(!updateOpportunity){
     throw new Error('Failed to update the user');
   }
  res.status(201).json({
    status:"success",
    message:"The Opportunity was successfully  updated",
    data:omit(updateOpportunity,['__v'])
  })
     } catch (error) {
        next(error)
     }

}


 static  async deleteOpportunity(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{
  const repository= new OpportunityRepository();
  const  service= new OpportunityServices( repository);

  try {
    const user= req.user;
    if(!user){
        res.status(401)
         throw new Error("Unauthenticated")
    }
    const {id}= req.params;
    if(!id){
      res.status(400)
      throw new Error('Id of opportunity is  required ');
    }
    const opportunities= await service.findAllOpportunities({organizationId:user._id,_id:id});

    if(opportunities.length===0){
       res.status(400)
       throw new Error("Opportunity with given id for this organization was not found");
    }

     await service.deleteOpportunity(id);
     res.status(203).json({
       status:'success',
       message:"opportunity successfully deleted",
     })
  } catch (error) {
     next(error)
  }
 
 }

 static async findOpportunityById(req:Request,res:Response,next:NextFunction):Promise<void>{
    const repository= new OpportunityRepository();
    const  service= new OpportunityServices( repository);
  try {
    const {id}= req.params;
    if(!id){
    res.status(400);
    throw new Error("Opportunity Id is required");
    }
    const opportunity= await service.findOpportunity(id);
    if(!opportunity){
      res.status(403)
      throw new Error("Opportunity with the given id  was not found");
   }
    const leanOpportunity=omit(opportunity,['__v'])
    res.status(200).json({
      status:'success',
      data:leanOpportunity
    })
  } catch (error) {
    next(error)
  }
 }

 static  async findOpportunities(req:Request,res:Response,next:NextFunction):Promise<void>{
    const repository= new OpportunityRepository();
    const  service= new OpportunityServices( repository);
   try {
      const query=req.query
      const opportunities= await service.findAllOpportunities(query);
      const leanOpportunities= opportunities.map(v=>omit(v,['__v']));
     res.status(200).json({
      status:"success",
      data:leanOpportunities
     })
   } catch (error) {
     next(error);
   }

 }
 
}