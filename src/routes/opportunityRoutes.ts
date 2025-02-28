import { Router} from "express";

import { OpportunityController } from "../controllers/opportunityController";
import { Middleware } from "../middlewares/Middlewares";
const router= Router();
router.post('/create',Middleware.authentication('organization'),OpportunityController.createOpportunity);
router.get('/:id',OpportunityController.findOpportunityById);
router.get('/',OpportunityController.findOpportunities);
router.put('/:id',Middleware.authentication("organization"),OpportunityController.updateOpportunity);
router.delete('/:id',Middleware.authentication("organization"),OpportunityController.deleteOpportunity)
export default router;