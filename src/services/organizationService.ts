import { IOrganization } from "../models/organization"; 
import { OrganizationRepository} from "../repositories/organizaitonRepository";
import OrganizationValidationSchema,{OrganizationUpdateValidationSchema} from "../utils/organizationValidation";
import { Bcrypt } from "../utils/bcryptUtils";

class OrganizationServices{

private repository:OrganizationRepository;
private validator=OrganizationValidationSchema;
private updateValitor=OrganizationUpdateValidationSchema;
private bcrypt:Bcrypt;
 constructor( repository:OrganizationRepository){
 this.repository=repository;
 this.bcrypt=new Bcrypt();

}

async createOrganization(organizationData:IOrganization):Promise<IOrganization>{
      const validationResult=this.validator.safeParse(organizationData);

      if(!validationResult.success){
        const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
      }
      const {email,password,name}=organizationData;
       const organizationExists= await this.repository.find({email,name});

       if(organizationExists.length>0){
              throw new Error(`Organization already registered`);
       }
       const hashedPassword= await  this.bcrypt.hashPassword(password);
       const organization= await this.repository.create({...organizationData,password:hashedPassword});
    return organization;
    
}

async findOrganization(id:string){

const organization= await  this.repository.findById(id);
  if(!organization){
     throw new Error("User with the given id  was not found");
  }

   return organization;
}

async updateOrganization(updatedData:Partial<IOrganization>,id:string):Promise<IOrganization | null>{

     const organization = await this.repository.findById(id);
      if(! organization){
         throw new Error("User with the given id was not found");
      }
      const {email}=updatedData;

      if(email){
         throw new Error("Email can not be updated");
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

async deleteOrganization (id:string){

 const organization = await this.repository.findById(id);
      if(! organization){
         throw new Error("User with the given id was not found");
      }
    return await this.repository.delete(id)
}
async findAllOrganization(query:Record<string,any>):Promise<IOrganization[]>{

    return  await this.repository.find(query)
}
}

 export default OrganizationServices;