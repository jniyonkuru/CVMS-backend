import { Router} from "express";

import { ApplicationController } from "../controllers/applicationController";
import { Middleware } from "../middlewares/Middlewares";
const router= Router();
router.post('/create',Middleware.authentication,ApplicationController.createApplication);
router.get('/:id',ApplicationController.findApplicationById);
router.get('/',ApplicationController.findApplications);
router.put('/:id',Middleware.authentication,ApplicationController.updateApplication);
router.delete('/:id',Middleware.authentication,ApplicationController.deleteApplication)
export default router;