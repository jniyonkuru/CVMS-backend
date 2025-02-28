
import { IOpportunity } from "../models/opportunity";
import { OpportunityRepository } from "../repositories/opportunityRepository";
import { OpportunityValidationSchema ,UpdateOpportunityValidationSchema} from "../utils/opportunityValidation";

class OpportunityServices{
private repository:OpportunityRepository;
private validator=OpportunityValidationSchema;
private updateValidator=UpdateOpportunityValidationSchema;
 constructor( repository:OpportunityRepository){
 this.repository=repository;

}

async createOpportunity(opportunityData:IOpportunity):Promise<IOpportunity>{

        return await this.repository.create(opportunityData)
      
 ;
    
}

async findOpportunity(id:string){

const opportunity= await this.repository.findById(id);
 
   return  opportunity;
}

async updateOpportunity(updateData:IOpportunity,id:string):Promise<IOpportunity | null>{

    return  await this.repository.update(id,updateData)

}

async deleteOpportunity(id:string){

 const opportunity = this.repository.findById(id);
      if(! opportunity){
         throw new Error("Opportunity with the given id was not found");
      }
    return await this.repository.delete(id)
}
async findAllOpportunities(query:Record<string,any>):Promise<IOpportunity[]>{

    return  await this.repository.find(query)
}
}

 export default OpportunityServices;