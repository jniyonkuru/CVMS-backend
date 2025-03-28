import mongoose, { Document, Schema } from "mongoose";
import { ILocation, LocationSchema } from "./volunteer";

const opportunityStatus = {
    open: "open",
    closed: "closed",
} as const;

export type OpportunityStatusType = typeof opportunityStatus[keyof typeof opportunityStatus];

export interface IOpportunity extends Document {
    organizationId: mongoose.Types.ObjectId;
    title: string;
    skillsRequired: string[];
    location: ILocation;
    startDate: Date;
    endDate: Date;
    duration: string;
    numberOfVolunteerNeeded: number;
    status: OpportunityStatusType;
}

const OpportunitySchema = new Schema<IOpportunity>({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    skillsRequired: {
        type: [String],
        required: true,
    },
    location: {
        type: LocationSchema,
        required: true,
        _id:false
    },
    startDate: {
        type: Date,
        required: true,
        validate:{
            validator:function(this:IOpportunity,value:Date){
                return this.endDate?value<this.endDate:true;
            },
            message:"Start date should be before En date"
        }
    },
    endDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    numberOfVolunteerNeeded: {
        type: Number,
        required: true,
        min:[1,"At least one volunteer is needed"]
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
});

export const Opportunity = mongoose.model<IOpportunity>("Opportunity", OpportunitySchema);
