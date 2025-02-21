import mongoose,{Types,Schema} from "mongoose";


interface IFeedback{
 feedbackId:Types.ObjectId,
 volunteerId:Types.ObjectId,
 organizationId:Types.ObjectId,
 comments:string,
 rating:number,
 dateSubmitted:Date,
     
}

const feedbackSchema= new Schema({
 feedbackId:Schema.Types.ObjectId,
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

})

 export const Feedback= mongoose.model<IFeedback>("VolunteerToOrgFeedback",feedbackSchema);

