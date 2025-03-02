import VolunteerServices from "../services/volunteerServices";
import OrganizationServices from "../services/organizationService";
import { NextFunction ,Request,Response} from "express";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import { OrganizationRepository } from "../repositories/organizaitonRepository";
import { Bcrypt } from "../utils/bcryptUtils";
import { Jwt } from "../utils/jwtUtils";
import { isEmpty, pick } from "lodash";

  export  default class LoginController{

 static async login(req:Request,res:Response,next:NextFunction){  
    let  repository;
    let service;
    const bcryptInstance= new Bcrypt();
    const jwtInstance= new Jwt();

    try {
      const emptyRequest=isEmpty(req.body);
      if(emptyRequest){
        res.status(400);
        throw new Error("Credentials are required");
      }
      const {email,password,role}=req.body;

      if(!email || !password){
       res.status(400);
       throw new Error("Invalid credentials")
      }
   if(role && role==="volunteer"){
    repository= new VolunteerRepository();
    service=new VolunteerServices(repository);
    const volunteers = await service.findAllVolunteer({email});
    if(VolunteerServices.length===0){
        res.status(400);
        throw new Error("User not found");
      }
      const passwordMatch= await bcryptInstance.verifyPassword(password,volunteers[0].password);
  if(!passwordMatch){
    res.status(400)
    throw new Error("Invalid credentials");
  }
const payload= pick(volunteers[0],['_id',"role"]);
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
   }else if(role && role==="organization"){
    repository= new OrganizationRepository();
    service=new OrganizationServices(repository);
    const organizations = await service.findAllOrganization({email});
    if(organizations.length===0){
        res.status(400);
        throw new Error("User not found");
      }
      const passwordMatch= await bcryptInstance.verifyPassword(password,organizations[0].password);
  if(!passwordMatch){
    res.status(400)
    throw new Error("Invalid credentials");
  }
const payload= pick(organizations[0],['_id',"role"]);
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

   }else{
    res.status(400);
    throw new Error("role is invalid or not provided")
   }
  
    } catch (error) {
      next(error)
    }
    

    }
}