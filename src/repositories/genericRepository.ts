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
   return this.model.find(query)
    }
    async create(data: Partial<T>):Promise<T>{
      const document = new this.model(data);
      return document.save()
    }

    async findAll(): Promise<T[]> {
       return this.model.find();
    }

   async update(id: string, data: Partial<T>): Promise<T|null> {
      return this.model.findByIdAndUpdate(id,data,{new:true})
   }
    async delete(id: string): Promise<void> {
        this.model.findByIdAndDelete(id);
    }
    findById(id: string): Promise<T | null> {
       return this.model.findById(id);
    }


 }


export {GenericRepository};