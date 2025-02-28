import mongoose ,{Document,Schema } from 'mongoose';

 export interface ILocation{
country:string,
city:string,
}

const volunteerAvailabilityStatus={
  weekdays:'weekdays',
  weekends:'weekends',
  flexible:'flexible'
}  as const;
 const status={
    active:'active',
    inactive:'inactive'
 } as const 


 export type volunteerAvailabilityType= typeof  volunteerAvailabilityStatus[keyof  typeof volunteerAvailabilityStatus];
 export type  StatusType=typeof status[keyof typeof status];

 export interface IVolunteer extends Document{
firstName:string,
lastName:string,
email:string,
phoneNumber:string,
password:string,
skills:string[],
interests:string[],
availability:volunteerAvailabilityType,
location:ILocation,
profilePicture?:string,
dateJoined:Date,
status?:StatusType,
role?:string
}

  export const LocationSchema =new Schema<ILocation>({
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
    },

})

const VolunteerSchema = new Schema<IVolunteer>({
   
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
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
    skills:{
        type:[String],
        required:true,
        default:undefined,
    },
    interests:{
        type:[String],
        required:true,
        default:undefined
    },
    availability:{
        type:String,
        enum:Object.keys(volunteerAvailabilityStatus),
        default:'flexible'

    },
    location:{
        type:LocationSchema,
        _id:false
    },
    profilePicture: { type: String, 
    required: false 
    },
    dateJoined: { 
        type: Date, 
        default: Date.now },
    status: { 
        type: String,
         enum: ["active", "inactive"],
          default: "active",
        },
        role:{
            type:String,
            default:"volunteer"
        }
},{timestamps:true})
 
 export const Volunteer= mongoose.model<IVolunteer>('Volunteer',VolunteerSchema);

