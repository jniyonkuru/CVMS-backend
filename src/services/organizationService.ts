import { IOrganization } from "../models/organization"; 
import { OrganizationRepository} from "../repositories/organizaitonRepository";
import OrganizationValidationSchema,{OrganizationUpdateValidationSchema} from "../utils/organizationValidation";
import { Bcrypt } from "../utils/bcryptUtils";

class OrganizationServices{
private repository:OrganizationRepository;
 constructor( repository:OrganizationRepository){
 this.repository=repository;


}

async createOrganization(organizationData:IOrganization):Promise<IOrganization>{
  
    return  await this.repository.create(organizationData);
    
}

async findOrganization(id:string){

return await  this.repository.findById(id);
 
}

async updateOrganization(updatedData:Partial<IOrganization>,id:string):Promise<IOrganization | null>{

    return  await this.repository.update(id,updatedData)

}

async deleteOrganization (id:string){

    return await this.repository.delete(id)
}
async findAllOrganization(query:Record<string,any>):Promise<IOrganization[]>{

    return  await this.repository.find(query)
}
}

 export default OrganizationServices;