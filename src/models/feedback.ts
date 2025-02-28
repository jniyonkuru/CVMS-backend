import mongoose,{Types,Schema,Document} from "mongoose";

 export interface IFeedback extends Document{
 volunteerId:Types.ObjectId,
 organizationId:Types.ObjectId,
 comments:string,
 rating:number,
 dateSubmitted:Date,
     
}

const feedbackSchema= new Schema<IFeedback>({

 volunteerId:{
    type:Schema.Types.ObjectId,
    ref:'Volunteer',
    required:true
 },
 organizationId:{
    type:Schema.Types.ObjectId,
    ref:'Organization',
    required:true,
 },
 rating:{
    type:Number,
    required:true,
    min:1,
    max:5
 },
 dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  comments:{
   type:String,
   required:true,
  }


})

 export const Feedback= mongoose.model<IFeedback>("VolunteerToOrgFeedback",feedbackSchema);

