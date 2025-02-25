import {Document,Model} from 'mongoose';

interface IGenericRepository<T extends Document>{
   create(data:Partial<T>):Promise<T>,
   findById(id:string):Promise<T|null>,
   findAll():Promise<T[]>,
   find(query:Record<string,any>):Promise<T[]>,
   update(id:string,data:Partial<T>):Promise<T|null>,
   delete(id:string):Promise<void>
} 

 class GenericRepository<T extends Document> implements IGenericRepository<T>{
    private model:Model<T>;
    constructor(model:Model<T>){
      this.model=model;
    }
    async find(query:Record<string,any>):Promise<T[]>{
      const docs= await this.model.find(query);
   return docs as T[];
    }
    async create(data: Partial<T>):Promise<T>{
      const document =  this.model.create({...data});
      const leanObject =(await document).toObject()
      return leanObject as T
    }

    async findAll(): Promise<T[]> {
      const docs= await  this.model.find().lean();
       return docs as T[];
    }

   async update(id: string, data: Partial<T>): Promise<T|null> {
      
      const doc=await this.model.findByIdAndUpdate(id,data,{new:true}).lean()
      return doc as T;
   }
    async delete(id: string): Promise<void> {
       await  this.model.findByIdAndDelete(id);
    }
   async findById(id: string): Promise<T | null> {
      const doc=  await this.model.findById(id).lean();
       return doc  as T;
    }


 }


export {GenericRepository};