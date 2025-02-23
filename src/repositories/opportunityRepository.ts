import { GenericRepository } from "./genericRepository";

import { IOpportunity } from "../models/opportunity";
import { Opportunity } from "../models/opportunity";

export class OpportunityRepository extends GenericRepository<IOpportunity>{
    constructor (){
        super(Opportunity)
    }
}