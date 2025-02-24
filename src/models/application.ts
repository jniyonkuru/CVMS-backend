import mongoose,  {Types,Schema,Document} from "mongoose";
import { Opportunity } from "./opportunity";

const applicationStatus={
    pending:"pending",
    approved:"approved",
    rejected:"rejected"
} as const

 export type ApplicationStatusTypes= typeof applicationStatus[keyof typeof applicationStatus]

 export interface IApplication extends Document{
   opportunityId:Types.ObjectId,
   volunteerId:Types.ObjectId,
   applicationDate:Date,
   status: ApplicationStatusTypes
}


const applicationSchema= new Schema<IApplication>({

    opportunityId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Opportunity'
    },

    volunteerId:{
        type:Schema.Types.ObjectId,
        ref:"Volunteer",
        required:true

    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    applicationDate:{
        type:Date,
        default:Date.now,
        validate: {
            validator: function (value) {
              return value >= new Date().setHours(0, 0, 0, 0); 
            },
            message: 'Expiry date must be today or a future date.',
          }


    }


})

const Application= mongoose.model<IApplication>('Application',applicationSchema);

export default Application;


