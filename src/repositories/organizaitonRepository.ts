import { IOrganization } from "../models/organization";

import { GenericRepository } from "./genericRepository";
import { Model } from "mongoose";

 export class OrganizationRepository extends GenericRepository<IOrganization>{
    constructor(model:Model<IOrganization>){
        super(model)

    }
}