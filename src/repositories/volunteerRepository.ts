import { GenericRepository } from "./genericRepository";
import { Volunteer } from "../models/volunteer";
import { Model } from "mongoose";
import { IVolunteer } from "../models/volunteer";

export class VolunteerRepository extends GenericRepository<IVolunteer>{
   constructor(){
    super(Volunteer)
   }

}