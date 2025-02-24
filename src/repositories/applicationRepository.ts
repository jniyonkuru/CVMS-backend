import { GenericRepository } from "./genericRepository";
import { IApplication } from "../models/application";
import Application from "../models/application";

export class ApplicationRepository extends GenericRepository<IApplication>{
 constructor(){
    super(Application)
 }
}
