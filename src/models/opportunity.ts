import mongoose, { Document, Schema } from "mongoose";
import { ILocation, LocationSchema } from "./volunteer";

const opportunityStatus = {
    open: "open",
    closed: "closed",
} as const;

export type OpportunityStatusType = typeof opportunityStatus[keyof typeof opportunityStatus];

export interface IOpportunity extends Document {
    opportunityId: mongoose.Types.ObjectId;
    organizationId: mongoose.Types.ObjectId;
    Title: string;
    skillsRequired: string[];
    location: ILocation;
    startDate: Date;
    endDate: Date;
    duration: string;
    numberOfVolunteerNeeded: number;
    status: OpportunityStatusType;
}

const OpportunitySchema = new Schema<IOpportunity>({
    opportunityId:Schema.Types.ObjectId,
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    Title: {
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
    },
    startDate: {
        type: Date,
        required: true,
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
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
});

export const Opportunity = mongoose.model<IOpportunity>("Opportunity", OpportunitySchema);
