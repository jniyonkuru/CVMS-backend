import { NextFunction, Request,Response } from "express";

import {omit,isEmpty}from "lodash"
import { OrganizationRepository } from "../repositories/organizaitonRepository";
import { IOrganization } from "../models/organization";
import OrganizationServices from "../services/organizationService";
import { Bcrypt } from "../utils/bcryptUtils";
import { Jwt } from "../utils/jwtUtils";
import { pick } from "lodash";
import { CustomRequest } from "../middlewares/Middlewares";
import OrganizationValidationSchema,{OrganizationUpdateValidationSchema} from "../utils/organizationValidation";

  export class OrganizationController {

    static async loginOrganization(req:Request,res:Response,next:NextFunction):Promise<void>{
      const  repository= new OrganizationRepository();
      const service= new OrganizationServices( repository);
      const bcryptInstance= new Bcrypt();
      const jwtInstance=new Jwt();

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
    const [organization] = await service.findAllOrganization({email});
    if(!organization){
      res.status(400);
      throw new Error("organization not found");
    }
  const passwordMatch= await bcryptInstance.verifyPassword(password,organization.password);
    if(!passwordMatch){
      res.status(400)
      throw new Error("Invalid credentials");
    }
const payload= pick(organization,['_id','email','role']);
const token =jwtInstance.generateToken(payload);
if(!token){
  throw new Error("Internal Error")
}
 res.status(200).json({
  status:"success",
  message:'organization logged in successfully',
  data:{
    token,
  }
 })
    
      } catch (error) {
        next(error)
      }


    }
  static async createOrganization(req:Request,res:Response,next:NextFunction):Promise<void>{
    const  repository= new OrganizationRepository();
    const service= new OrganizationServices( repository);
    const bcryptInstance= new Bcrypt();
     try {
      const emptyBody=isEmpty(req.body);
      if(emptyBody){
        res.status(400);
        throw new Error('request body can not be empty')
      } 
      const validationResult=OrganizationValidationSchema.safeParse(req.body);

      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
      }
      const {email,password,name}=req.body;
       const organizationExists= await service.findAllOrganization({$or:[{email},{name}]});

       if(organizationExists.length>0){
              throw new Error(`Organization already registered`);
       }
       const hashedPassword= await  bcryptInstance.hashPassword(password);
       const organization= await service.createOrganization({...req.body,password:hashedPassword});

       if(!organization){
         throw new Error('Failed to register  a organization')

       }
       const organizationWithoutPassword =omit(organization, ['__v','password']);
       res.status(201).json({
        status:'success',
        message:"organization registration was successful",
        data:organizationWithoutPassword
       })
      
     } catch (error) {
        next(error)
        
     }

}

static async updateOrganization(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{

  const repository= new OrganizationRepository();
  const service= new OrganizationServices( repository);
  try{
  const {id}= req.params;
  const user= req.user;

  if(!id){
    res.status(400)
    throw new Error('Id  is  required ');
  }
  const orgExists = await service.findOrganization(id);

if(!orgExists){
  res.status(400);
  throw new Error("Organization with the given id does not exists")
}
  if(user && user._id !== id){
    res.status(401);
    throw new Error("unauthorized")
  }
     
   const organization:IOrganization| null= await service.updateOrganization(req.body,id);

   if(!organization){
     throw new Error('Failed to update the organization');
   }
  res.status(201).json({
    status:"success",
    message:"The organization was successfully  updated",
    data:omit(organization,['__v','password'])
  })
     } catch (error) {
        next(error)
     }

}

 static  async deleteOrganization(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{
  const repository= new OrganizationRepository();
  const  service= new OrganizationServices( repository);

  try {
    const {id}= req.params;
    const user= req.user;
    if(!id){
      res.status(400)
      throw new Error('Id is  required ');
    }
 const orgExists= await service.findOrganization(id);

 if(!orgExists){
res.status(400);
throw new Error('Organization with the given id does not exists')

 }
 if(user&& user._id!== id){
  res.status(403);
  throw new Error("unauthorized")
 }

     await service.deleteOrganization(id);
     res.status(200).json({
       status:'success',
       message:"organization successfully deleted",
     })
  } catch (error) {
     next(error)
  }
 
 }

 static async findOrganizationById(req:Request,res:Response,next:NextFunction):Promise<void>{
  const repository= new OrganizationRepository();
  const service= new OrganizationServices( repository);
  try {
    const {id}= req.params;
    if(!id){
    res.status(400);
    throw new Error(" Id is required");
    }
    const organization= await service.findOrganization(id);

    if(!organization){
      res.status(400);
      throw new Error("Organization with  the given id  does not exists")
    }
    const organizationWithoutpassword=omit(organization,['__v','password'])
    res.status(203).json({
      status:'success',
      data:organizationWithoutpassword
    })
  } catch (error) {
    next(error)
  }
 }

 static  async findOrganizations(req:Request,res:Response,next:NextFunction):Promise<void>{
  const repository= new OrganizationRepository();
  const service= new OrganizationServices( repository);
   try {
      const query=req.query
      const organizations= await service.findAllOrganization(query);
      const organizationWithoutPasswords= organizations.map(v=>omit(v,['__v','password']));
     res.status(200).json({
      status:"success",
      data:organizationWithoutPasswords
     })
   } catch (error) {
    next(error)
   }
 }
}