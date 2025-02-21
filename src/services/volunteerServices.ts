import { IVolunteer } from "../models/volunteer";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import volunteerValidationSchema from "../utils/volunteerValidation";


class VolunteerServices{

private repository:VolunteerRepository;
private validator=volunteerValidationSchema;
 constructor( repository:VolunteerRepository){
 this.repository=repository;

}

async createVolunteer(volunteerData:IVolunteer):Promise<IVolunteer>{
      const validationResult=this.validator.safeParse(volunteerData);

      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
      }
    const volunteer= await this.repository.create(volunteerData);
    return volunteer;
    
}

async findVolunteer(id:string){

const volunteer= this.repository.findById(id);

  if(!volunteer){
     throw new Error("User with the given id  was not found");
  }


   return  volunteer;
}

async updateVolunteer(updatedData:IVolunteer,id:string):Promise<IVolunteer | null>{

     const volunteer = this.repository.findById(id);

      if(! volunteer){
         throw new Error("User with the given id was not found");
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

async deleteVolunteer (id:string){

 const volunteer = this.repository.findById(id);
      if(! volunteer){
         throw new Error("User with the given id was not found");
      }
    return await this.repository.delete(id)
}

async findAllVolunteer(query:Record<string,any>):Promise<IVolunteer[]>{

    return  await this.repository.find(query)

}



}


 export default VolunteerServices;