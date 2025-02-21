import { IOrganization } from "../models/organization";
import { IVolunteer } from "../models/volunteer";
import { GenericRepository } from "./genericRepository";
import { Model } from "mongoose";

 export class OrganizationRepository extends GenericRepository<IVolunteer>{
    constructor(model:Model<IVolunteer>){
        super(model)

    }
}