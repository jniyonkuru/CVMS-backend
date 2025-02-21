import mongoose ,{Document,Schema } from 'mongoose';
import { StatusType ,ILocation,LocationSchema} from './volunteer';

export interface IOrganization extends Document{
organizationId?:mongoose.Types.ObjectId,
name:string,
email:string,
phoneNumber:string,
password:string,
focusArea:string[],
location:ILocation,
profilePicture?:string,
status:StatusType,
websiteUrl:string,
logo?:string,
dateRegistered:Date,
missionStatement:string,
}

const OrganizationSchema = new Schema<IOrganization>({
organizationId:Schema.Types.ObjectId,
  name:{
        type:String,
        required:true,
    },
 
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    focusArea:{
        type:[String],
        required:true,
        default:undefined,
    },
    location:LocationSchema,
    profilePicture: { type: String, 
    required: false 
    },
    dateRegistered: { 
        type: Date, 
        default: Date.now },
    status: { 
        type: String,
         enum: ["active", "inactive"],
          default: "active" 
        }
})
 
 export const Organization= mongoose.model<IOrganization>('Organization',OrganizationSchema);