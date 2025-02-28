

import { IFeedback } from "../models/feedback";
import FeebackRepository from "../repositories/feebackRepository";

class FeebackServices{
private repository:FeebackRepository;
 constructor( repository:FeebackRepository){
 this.repository=repository;

}

async createFeeback(feebackData:IFeedback):Promise<IFeedback>{
  
   
       const opportunity= await this.repository.create(feebackData)
      
    return opportunity;
    
}

async findFeeback(id:string){
   return await this.repository.findById(id);
}

async updateFeeback(updateData:Partial<IFeedback>,id:string):Promise<IFeedback | null>{


    return  await this.repository.update(id,updateData)

}

async deleteFeeback(id:string):Promise<void>{


    return await this.repository.delete(id)
}
async findAllFeeback(query:Record<string,any>):Promise<IFeedback[]>{
    return  await this.repository.find(query)
}
}

 export default FeebackServices;