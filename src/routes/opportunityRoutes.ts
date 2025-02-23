import { Router} from "express";

import { OpportunityController } from "../controllers/opportunityController";
import { Middleware } from "../middlewares/Middlewares";
const router= Router();
router.post('/create',Middleware.authentication,OpportunityController.createOpportunity);
router.get('/:id',OpportunityController.findOpportunityById);
router.get('/',OpportunityController.findOpportunities);
router.put('/:id',Middleware.authentication,OpportunityController.updateOpportunity);
router.delete('/:id',Middleware.authentication,OpportunityController.deleteOpportunity)
export default router;