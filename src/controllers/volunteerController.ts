import { NextFunction, Request,Response } from "express";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import VolunteerServices from "../services/volunteerServices";
import { IVolunteer } from "../models/volunteer";
import {omit, omitBy, pick}from "lodash"

  export class VolunteerController {

static async createVolunteer(req:Request,res:Response,next:NextFunction):Promise<void>{
     const repository= new VolunteerRepository();
     const service= new VolunteerServices(repository);

     try {
       let  volunteer: Partial<IVolunteer>|null=  await service.createVolunteer(req.body);
       if(!volunteer){
         throw new Error('Failed to register  a volunteer')

       }
       const volunteerWithoutPassword =omit(volunteer, ['__v','password']);
       res.status(201).json({
        status:'success',
        message:"Volunteer registration was successful",
        data:volunteerWithoutPassword
       })
      
     } catch (error) {
        next(error)
        
     }

}

static async updateVolunteer(req:Request, res:Response,next:NextFunction):Promise<void>{
  const {id}= req.params;

  if(!id){
    throw new Error('Id of a user is  required ');
  }
  const repository= new VolunteerRepository();
  const service= new VolunteerServices(repository)

     try {
   const volunteer:IVolunteer| null= await service.updateVolunteer(req.body,id);

   if(!volunteer){
     throw new Error('Failed to update the user');
   }
  res.status(201).json({
    status:"success",
    message:"The user was successfully  updated",
    data:omit(volunteer,['_v','password'])
  })
     } catch (error) {
        next(error)
     }


}

 static  async deleteVolunteer(req:Request, res:Response,next:NextFunction):Promise<void>{

  const repository= new VolunteerRepository();
  const service= new VolunteerServices(repository);
  const {id}= req.params;
  if(!id){
    throw new Error('Id of a user is  required ');
  }
 
  
  




 }
 
}