import { GenericRepository } from "./genericRepository";
import { Model } from "mongoose";
import { IOpportunity } from "../models/opportunity";

export class OpportunityRepository extends GenericRepository<IOpportunity>{
    constructor (model:Model<IOpportunity>){
        super(model)
    }
}