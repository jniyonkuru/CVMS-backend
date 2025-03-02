import VolunteerServices from "../services/volunteerServices";
import OrganizationServices from "../services/organizationService";
import { NextFunction ,Request,Response} from "express";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import { OrganizationRepository } from "../repositories/organizaitonRepository";
import { CustomRequest } from "../middlewares/Middlewares";
import { omit } from "lodash";

 export default class MeController{
    static async getUser(req:CustomRequest,res:Response,next:NextFunction){
        let repository;
        let service;
       try {
    const user= req.user;
    if(!user){
        res.status(401);
        throw new Error("Not Authenticated")
    }
    const {_id:id,role}=user;
    if(role&&role==="volunteer"){
     repository=new VolunteerRepository();
     service= new VolunteerServices(repository);
     const volunteer= await service.findVolunteer(id);
     if(!volunteer){
        res.status(400);
        throw new Error(" User with the given id was not found");
     };

     res.status(200).json(
       omit(volunteer,['password',"__v"])

      )

    } else  if(role&&role==="organization"){
        repository=new OrganizationRepository();
        service= new OrganizationServices(repository);
        const organization= await service.findOrganization(id);
        if(!organization){
           res.status(400);
           throw new Error(" User with the given id was not found");
        };
   
     res.status(200).json(
        omit(organization,['password',"__v"])  
         )
   
       } else {
       res.status(400);
       throw new Error('User role is invalid or  was not provided')

       }

       } catch (error) {
        
       }
    }
}
