
import { IOpportunity } from "../models/opportunity";
import { OpportunityRepository } from "../repositories/opportunityRepository";
import { OpportunityValidationSchema } from "../utils/opportunityValidation";



class OpportunityServices{
private repository:OpportunityRepository;
private validator=OpportunityValidationSchema;
 constructor( repository:OpportunityRepository){
 this.repository=repository;

}

async createOpportunity(opportunityData:IOpportunity):Promise<IOpportunity>{
      const validationResult=this.validator.safeParse(opportunityData);
      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
      }
      const {Title,organizationId}=opportunityData;
       const exists= await this.repository.find({Title,organizationId});

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

async updateOpportunity(updatedData:Partial<IOpportunity>,id:string):Promise<IOpportunity | null>{

     const opportunity = await  this.repository.findById(id);
      if(! opportunity){
         throw new Error("Opportunity with the given id was not found");
      }
      const {organizationId}=updatedData;
      if(organizationId){
         throw new Error("organization can not be updated");
      }
    const validationResult= this.validator.safeParse(updatedData);
    if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }

    return  await this.repository.update(id,updatedData)

}

async deleteOpportunity(id:string){

 const opportunity = this.repository.findById(id);
      if(! opportunity){
         throw new Error("Opportunity with the given id was not found");
      }
    return await this.repository.delete(id)
}
async findAllVolunteer(query:Record<string,any>):Promise<IOpportunity[]>{

    return  await this.repository.find(query)
}
}

 export default OpportunityServices;