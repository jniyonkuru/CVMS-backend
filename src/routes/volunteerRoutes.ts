import { Router} from "express";

import { VolunteerController } from "../controllers/volunteerController";

const router= Router();
router.post('/create',VolunteerController.createVolunteer);

export default router;

