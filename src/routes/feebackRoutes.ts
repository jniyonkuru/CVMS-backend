import { FeedbackController } from "../controllers/feebackController";
import { Middleware } from "../middlewares/Middlewares";
import { Router} from "express";
const router= Router();
router.post('/create/:id',Middleware.authentication('organization'),FeedbackController.createFeeback);
router.get('/:id',FeedbackController.findFeebackById);
router.get('/',FeedbackController.findAllFeebacks);
router.put('/:id',Middleware.authentication("organization"),FeedbackController.updateFeedback);
router.delete('/:id',Middleware.authentication("organization"),FeedbackController.deleteFeebak)
export default router;