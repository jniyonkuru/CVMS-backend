import { IVolunteer } from "../models/volunteer";
import { VolunteerRepository } from "../repositories/volunteerRepository";
import volunteerValidationSchema,{volunteerUpdateSchema}from "../utils/volunteerValidation";
import { Bcrypt } from "../utils/bcryptUtils";

class VolunteerServices{

private repository:VolunteerRepository;
private validator=volunteerValidationSchema;
private updateValitor=volunteerUpdateSchema;
private bcrypt:Bcrypt;
 constructor( repository:VolunteerRepository){
 this.repository=repository;
 this.bcrypt=new Bcrypt();

}

async createVolunteer(volunteerData:IVolunteer):Promise<IVolunteer>{
     
      const {password}=volunteerData;



       const hashedPassword= await  this.bcrypt.hashPassword(password);
       const volunteer= await this.repository.create({...volunteerData,password:hashedPassword});
    return volunteer;
    
}

async findVolunteer(id:string){

const volunteer= this.repository.findById(id);
  if(!volunteer){
     throw new Error("User with the given id  was not found");
  }

   return  volunteer;
}

async updateVolunteer(updatedData:Partial<IVolunteer>,id:string):Promise<IVolunteer | null>{

     const volunteer = this.repository.findById(id);
      if(! volunteer){
         throw new Error("User with the given id was not found");
      }
      const {email,password}=updatedData;

      if(email||password){
         throw new Error("Email and password can not be updated");
      }
    const validationResult= this.updateValitor.safeParse(updatedData);
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