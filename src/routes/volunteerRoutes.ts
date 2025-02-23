import { Router} from "express";

import { VolunteerController } from "../controllers/volunteerController";

const router= Router();
router.post('/login',VolunteerController.loginVolunteer)
router.post('/create',VolunteerController.createVolunteer);
router.get('/:id',VolunteerController.findVolunteerById);
router.get('/',VolunteerController.findVolunteers);
router.put('/:id',VolunteerController.updateVolunteer);
router.delete('/:id',VolunteerController.deleteVolunteer)
export default router;

