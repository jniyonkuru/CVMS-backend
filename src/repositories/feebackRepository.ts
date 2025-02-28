import { GenericRepository } from "./genericRepository";
import { Feedback,IFeedback } from "../models/feedback";

export  default class FeebackRepository extends GenericRepository<IFeedback>{
     constructor(){
        super(Feedback)
     }
}