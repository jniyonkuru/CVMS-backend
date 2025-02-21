import { z } from "zod";

const volunteerAvailabilityType = z.enum(["weekdays", "weekends", "flexible"]);
const statusType = z.enum(["active", "inactive"]);


const locationSchema = z.object({
  city: z.string(),
  state: z.string(),
  zipCode: z.string().optional(),
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
});

export default volunteerValidationSchema;