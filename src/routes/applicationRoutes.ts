import { Router} from "express";

import { ApplicationController } from "../controllers/applicationController";
import { Middleware } from "../middlewares/Middlewares";
const router= Router();
router.post('/create',Middleware.authentication("volunteer"),ApplicationController.createApplication);
router.get('/byOrganization',Middleware.authentication('organization'),ApplicationController.findApplicationsByOrganization)
router.get('/:id',ApplicationController.findApplicationById);
router.get('/',ApplicationController.findApplications);
router.put('/:id',Middleware.authentication('organization'),ApplicationController.updateApplication);
router.delete('/:id',Middleware.authentication('volunteer'),ApplicationController.deleteApplication);

export default router;