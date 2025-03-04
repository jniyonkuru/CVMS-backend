import mongoose ,{Document,Schema } from 'mongoose';
import { StatusType ,ILocation,LocationSchema} from './volunteer';

export interface IOrganization extends Document{
name:string,
email:string,
phoneNumber:string,
password:string,
focusArea:string[],
location:ILocation,
profilePicture?:string,
status?:StatusType,
websiteUrl:string,
logo?:string,
dateRegistered?:Date,
missionStatement:string,
role?:string
}

const OrganizationSchema = new Schema<IOrganization>({
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
    location:{
        type:LocationSchema,
        required:true,
        _id:false
    },
    profilePicture: { type: String, 
    required: false 
    },
    logo: { type: String, 
        required: false 
        },
    dateRegistered: { 
        type: Date, 
        default: Date.now },
    status: { 
        type: String,
         enum: ["active", "inactive"],
          default: "active" 
        },
        missionStatement:{
            type:String,
            required:true
        },
        websiteUrl:{
         type:String,
         unique:true
        },
        role:{
            type:String,
            default:"organization"
        }
},{timestamps:true})
 
 export const Organization= mongoose.model<IOrganization>('Organization',OrganizationSchema);