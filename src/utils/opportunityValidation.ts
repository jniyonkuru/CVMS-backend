import { z } from 'zod';
import mongoose from 'mongoose';

import { locationSchema } from './volunteerValidation';

const OpportunityStatusTypeSchema = z.enum(['open', 'closed', 'ongoing'], {
    errorMap: () => ({ message: 'Status must be one of: open, closed, ongoing' }),
});

 export const OpportunityValidationSchema = z.object({
    organizationId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid organization ID',
    }),
    title: z.string().min(1, { message: 'Title is required' }),
    skillsRequired: z.array(z.string().min(1, { message: 'Skill cannot be empty' })).nonempty({
        message: 'At least one skill is required',
    }),
    location: locationSchema,
    startDate: z.date(),
    endDate: z.date(),
    duration: z.string().min(1, { message: 'Duration is required' }),
    numberOfVolunteerNeeded: z.number().int().positive({
        message: 'Number of volunteers needed must be a positive integer',
    }),
    status: OpportunityStatusTypeSchema.optional(),
}).strict();

export  const UpdateOpportunityValidationSchema=z.object({

    title: z.string().min(1, { message: 'Title is required' }),
    skillsRequired: z.array(z.string().min(1, { message: 'Skill cannot be empty' })).nonempty({
        message: 'At least one skill is required',
    }),
    location: locationSchema,
    startDate: z.date(),
    endDate: z.date(),
    duration: z.string().min(1, { message: 'Duration is required' }),
    numberOfVolunteerNeeded: z.number().int().positive({
        message: 'Number of volunteers needed must be a positive integer',
    }),
    status: OpportunityStatusTypeSchema.optional(),
}).strict();

