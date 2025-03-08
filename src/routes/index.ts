import { Router} from "express";
import volunteerRouter from "./volunteerRoutes";
import organizationRouter from "./organizationRouter"
import opportunityRouter from "./opportunityRoutes"
import applicationsRouter from "./applicationRoutes"
import feebackRouter from "./feebackRoutes"
import LoginController from "../controllers/loginController";
import MeController from "../controllers/userController";
import { Middleware } from "../middlewares/Middlewares";

const router= Router();
router.get('/me',Middleware.authentication(),MeController.getUser);
router.post('/login',LoginController.login)
router.use('/volunteers',volunteerRouter)
router.use('/organizations',organizationRouter)
router.use('/opportunities',opportunityRouter)
router.use('/applications',applicationsRouter)
router.use('/feedbacks',feebackRouter)

export  default router;