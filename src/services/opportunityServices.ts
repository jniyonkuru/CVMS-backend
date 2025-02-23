
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
      const validationResult=this.validator.safeParse({...opportunityData,startDate:new Date(opportunityData.startDate),endDate:new Date(opportunityData.endDate)});
      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
      }
      const {title,organizationId}=opportunityData;
       const exists= await this.repository.find({title,organizationId});

       if(exists.length>0){
              throw new Error(`Opportunity with this Title  already exists`);
       }

       const opportunity= await this.repository.create(opportunityData)
      
    return opportunity;
    
}

async findOpportunity(id:string){

const opportunity= await this.repository.findById(id);
  if(!opportunity){
     throw new Error("User with the given id  was not found");
  }

   return  opportunity;
}

async updateOpportunity(updateData:IOpportunity,id:string):Promise<IOpportunity | null>{

     const opportunity = await  this.repository.findById(id);
      if(! opportunity){
         throw new Error("Opportunity with the given id was not found");
      }
      const {organizationId}=updateData;
      if(organizationId){
         throw new Error("organization can not be updated");
      }
    const validationResult= this.updateValidator.safeParse({...updateData,startDate:new Date(updateData.startDate),endDate:new Date(updateData.endDate)});
    if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }

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