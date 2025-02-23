import { NextFunction, Request,Response } from "express";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import VolunteerServices from "../services/volunteerServices";
import { IVolunteer } from "../models/volunteer";
import {omit, isEmpty, pick}from "lodash"
import { Jwt } from "../utils/jwtUtils";
import { Bcrypt } from "../utils/bcryptUtils";

  export class VolunteerController {


    static async  loginVolunteer(req:Request,res:Response,next:NextFunction):Promise<void>{
      const  repository= new VolunteerRepository();
      const service= new VolunteerServices( repository);
      const bcryptInstance= new Bcrypt();
      const jwtInstance= new Jwt();

      try {
        const emptyRequest=isEmpty(req.body);
        if(emptyRequest){
          res.status(400);
          throw new Error("Credentials are required");
        }
        const {email,password}=req.body;

        if(!email || !password){
         res.status(400);
         throw new Error("Invalid credentials")
        }
    const [volunteer] = await service.findAllVolunteer({email});
    if(!volunteer){
      res.status(400);
      throw new Error("User not found");
    }
  const passwordMatch= await bcryptInstance.verifyPassword(password,volunteer.password);
    if(!passwordMatch){
      res.status(400)
      throw new Error("Invalid credentials");
    }
const payload= pick(volunteer,['_id','email']);
const token =jwtInstance.generateToken(payload);
if(!token){
  throw new Error("Internal Error")
}
 res.status(200).json({
  status:"success",
  message:'user logged in successfully',
  data:{
    token,
  }
 })
    
      } catch (error) {
        next(error)
      }
    }
  

  static async createVolunteer(req:Request,res:Response,next:NextFunction):Promise<void>{
    const  repository= new VolunteerRepository();
    const service= new VolunteerServices( repository);
     try {
      const emptyBody=isEmpty(req.body);
      if(emptyBody){
        res.status(400);
        throw new Error('request body can not be empty')
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

static async updateVolunteer(req:Request, res:Response,next:NextFunction):Promise<void>{

  const repository= new VolunteerRepository();
  const service= new VolunteerServices( repository);
  try{
  const {id}= req.params;

  if(!id){
    res.status(400)
    throw new Error('Id of a user is  required ');
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