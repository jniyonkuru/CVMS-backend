import {z} from'zod';
import { locationSchema } from './volunteerValidation';

const StatusTypeSchema = z.enum(['active', 'inactive', 'pending']);
const OrganizationValidationSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    focusArea: z.array(z.string()).nonempty({ message: 'At least one focus area is required' }),
    location: locationSchema,
    profilePicture: z.string().optional(),
    status: StatusTypeSchema.optional(),
    websiteUrl: z.string().url({ message: 'Invalid website URL' }),
    logo: z.string().optional(),
    dateRegistered: z.date().optional(),
    missionStatement: z.string().min(1, { message: 'Mission statement is required' }),
}).strict();

 export const OrganizationUpdateValidationSchema= z.object({
    name: z.string().min(1,{message:'Name must be at least 1 character long'}).optional(),
    phoneNumber: z.string().min(1,{message:'Phone number is required'}).optional(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).optional(),
    focusArea: z.array(z.string()).nonempty({ message: 'At least one focus area is required' }).optional(),
    location: locationSchema.optional(),
    profilePicture: z.string().optional(),
    status: StatusTypeSchema.optional(),
    websiteUrl: z.string().url({ message: 'Invalid website URL' }).optional(),
    logo: z.string().optional(),
    missionStatement: z.string().min(1, { message: 'Mission statement is required' }).optional(),

})


export default  OrganizationValidationSchema;