import { NextFunction, Request,Response } from "express";
import { ApplicationRepository } from "../repositories/applicationRepository";
import ApplicationServices from "../services/applicationServices";
import { IApplication } from "../models/application";
import { CustomRequest } from "../middlewares/Middlewares";
import {omit, isEmpty}from "lodash"


export class ApplicationController {

  static async createApplication(req:CustomRequest,res:Response,next:NextFunction):Promise<void>{
    const  repository= new ApplicationRepository();
    const service= new ApplicationServices( repository);
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
      const applicationData={...req.body,volunteerId:user._id};
       const application=  await service.createOpportunity(applicationData);

       if(!application){
         throw new Error('Application has failed')

       }
      const  leanApplication =omit(application, ['__v']);
       res.status(201).json({
        status:'success',
        message:"Application was successful",
        data:leanApplication
       })
      
     } catch (error) {
        next(error)
        
     }

}

static async updateApplication(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{
    const  repository= new ApplicationRepository();
    const service= new ApplicationServices( repository);
  try{
  const {id}= req.params;
  if(!id){
    res.status(400)
    throw new Error('Application Id is  required ');
  }
  const user= req.user;
  if(!user){
      res.status(401)
       throw new Error("Unauthenticated")
  }
 
 const applications= await service.findApplications({volunteerId:user._id,_id:id});

 if(applications.length===0){
    res.status(400)
    throw new Error("application with given id for this organization was not found");
 }
   const updateApplication:IApplication| null= await service.updateApplication(req.body,id);
   if(!updateApplication){
     throw new Error('Failed to update the application');
   }
  res.status(201).json({
    status:"success",
    message:"Application was successfully  updated",
    data:omit(updateApplication,['__v'])
  })
     } catch (error) {
        next(error)
     }

}

 static  async deleteApplication(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{
    const  repository= new ApplicationRepository();
    const service= new ApplicationServices( repository);

  try {
    const user= req.user;
    if(!user){
        res.status(401)
         throw new Error("Unauthenticated")
    }
    const {id}= req.params;
    if(!id){
      res.status(400)
      throw new Error('Id of application is  required ');
    }
    const applications= await service.findApplications({volunteerId:user._id,_id:id});

    if(applications.length===0){
       res.status(400)
       throw new Error("Application with given id for this organization was not found");
    }

     await service.deleteApplication(id);
     res.status(203).json({
       status:'success',
       message:"Application successfully deleted",
     })
  } catch (error) {
     next(error)
  }
 
 }

 static async findApplicationById(req:Request,res:Response,next:NextFunction):Promise<void>{
    const  repository= new ApplicationRepository();
    const service= new ApplicationServices( repository);
  try {
    const {id}= req.params;
    if(!id){
    res.status(400);
    throw new Error("Application Id is required");
    }
    const application= await service.findApplication(id);
    const leanApplication=omit(application,['__v'])
    res.status(203).json({
      status:'success',
      data:leanApplication
    })
  } catch (error) {
    next(error)
  }
 }

 static  async findApplications(req:Request,res:Response,next:NextFunction):Promise<void>{
    const  repository= new ApplicationRepository();
    const service= new ApplicationServices( repository);
   try {
      const query=req.query
      const applications= await service.findApplications(query);
      const leanApplications= applications.map(v=>omit(v,['__v']));
     res.status(200).json({
      status:"success",
      data:leanApplications
     })
   } catch (error) {
     next(error);
   }

 }
 
}