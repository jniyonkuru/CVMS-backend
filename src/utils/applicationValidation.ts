import { z } from 'zod';
import mongoose from 'mongoose';

 export const ApplicationValidationSchema = z.object({
  opportunityId: z.string().refine((val) => mongoose.isValidObjectId(val), {
    message: 'opportunityId must be a valid MongoDB ObjectId',
  }),
  volunteerId: z.string().refine((val) => mongoose.isValidObjectId(val), {
    message: 'volunteerId must be a valid MongoDB ObjectId',
  }),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  applicationDate: z.date().refine((val) => val >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'applicationDate must be today or a future date',
  }).default(() => new Date()),
}).strict();

export const UpdateApplicationValidationSchema=z.object({
  status: z.enum(['pending', 'approved', 'rejected'])
}).strict();