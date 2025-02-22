import { z } from "zod";

const volunteerAvailabilityType = z.enum(["weekdays", "weekends", "flexible"]);
const statusType = z.enum(["active", "inactive"]);


 export const locationSchema = z.object({
  city: z.string(),
  country: z.string(),

});


const volunteerValidationSchema = z.object({
  volunteerId: z.string().optional(), 
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  email: z.string().email(), 
  phoneNumber: z.string(),
  password: z.string().min(8),
  skills: z.array(z.string()),
  interests: z.array(z.string()), 
  availability: volunteerAvailabilityType, 
  location: locationSchema, 
  profilePicture: z.string().optional(), 
  dateJoined: z.date().optional(), 
  status: statusType.optional(),
}).strict();

 export const volunteerUpdateSchema=z.object({
  volunteerId: z.string().optional(), 
  firstName: z.string().max(255).optional(),
  lastName: z.string().max(255).optional(),
  phoneNumber: z.string().optional(),
  password: z.string().min(8).optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(), 
  availability: volunteerAvailabilityType.optional(), 
  location: locationSchema.optional(), 
  profilePicture: z.string().optional().optional(), 
  status: statusType.optional().optional(),
}).strict();

export default volunteerValidationSchema;