import { Router} from "express";

import { VolunteerController } from "../controllers/volunteerController";
import { Middleware } from "../middlewares/Middlewares";

const router= Router();
router.post('/login',VolunteerController.loginVolunteer)
router.post('/create',VolunteerController.createVolunteer);
router.get('/:id',VolunteerController.findVolunteerById);
router.get('/',VolunteerController.findVolunteers);
router.put('/:id',Middleware.authentication('volunteer'),VolunteerController.updateVolunteer);
router.delete('/:id',Middleware.authentication('volunteer'),VolunteerController.deleteVolunteer)
export default router;

