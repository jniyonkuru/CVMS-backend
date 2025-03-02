import { NextFunction, Request,Response } from "express";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import VolunteerServices from "../services/volunteerServices";
import { IVolunteer } from "../models/volunteer";
import {omit, isEmpty, pick}from "lodash"
import { Jwt } from "../utils/jwtUtils";
import { Bcrypt } from "../utils/bcryptUtils";
import volunteerValidationSchema from "../utils/volunteerValidation";
import { CustomRequest } from "../middlewares/Middlewares";

  export class VolunteerController {
  

  static async createVolunteer(req:Request,res:Response,next:NextFunction):Promise<void>{
    const  repository= new VolunteerRepository();
    const service= new VolunteerServices( repository);
     try {
      const emptyBody=isEmpty(req.body);
      if(emptyBody){
        res.status(400);
        throw new Error('request body can not be empty')
      } 
      const validationResult=volunteerValidationSchema.safeParse(req.body);

      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
        res.status(400)
      throw new Error(`Validation failed: ${errorMessage}`);
      }  
      const{email}=req.body       

        let exists= await service.findAllVolunteer({email});
        if(exists.length>0){
          res.status(400);
          throw new Error("User with the given email already exists")
        }
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

static async updateVolunteer(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{

  const repository= new VolunteerRepository();
  const service= new VolunteerServices( repository);
  try{
  const {id}= req.params;

  if(!id){
    res.status(400)
    throw new Error('Id of a user is  required ');
  }
  const user= req.user;

  let userExits= await service.findVolunteer(id);

  if(!userExits){
    res.status(400);
    throw new Error("User with the given Id does not exists")
  }
  
  if(user && user._id!==id){
      res.status(401);
      throw new Error("unauthorized")
    }
 

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
  const  service= new VolunteerServices( repository);

  try {
    const {id}= req.params;
    if(!id){
      res.status(400)
      throw new Error('Id of a user is  required ');
    }
const volunteer:IVolunteer|null= await service.findVolunteer(id)
if(!volunteer){
  res.status(400)
  throw new Error('User with the given id does not exists')
}

if(id && id!== volunteer._id){
  res.status(401)
  throw new Error("unauthorized")
}

     await service.deleteVolunteer(id);
     res.status(200).json({
       status:'success',
       message:"user successfully deleted",
     })
  } catch (error) {
     next(error)
  }
 
 }

 static async findVolunteerById(req:Request,res:Response,next:NextFunction):Promise<void>{
  const repository= new VolunteerRepository();
  const service= new VolunteerServices( repository);
  try {
    const {id}= req.params;
    if(!id){
    res.status(400);
    throw new Error("User Id is required");
    }
    const volunteer= await service.findVolunteer(id);
    const volunteerWithoutpassword=omit(volunteer,['__v','password'])
    res.status(203).json({
      status:'success',
      data:volunteerWithoutpassword
    })
  } catch (error) {
    next(error)
  }
 }

 static  async findVolunteers(req:Request,res:Response,next:NextFunction):Promise<void>{
  const repository= new VolunteerRepository();
  const service= new VolunteerServices( repository);
   try {
      const query=req.query
      const volunteers= await service.findAllVolunteer(query);
      const volunteersWithoutPasswords= volunteers.map(v=>omit(v,['__v','password']));
     res.status(200).json({
      status:"success",
      data:volunteersWithoutPasswords
     })
   } catch (error) {
     next(error);
   }

 }
 
}