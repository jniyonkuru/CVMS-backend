import { Router} from "express";
import volunteerRouter from "./volunteerRoutes";
import organizationRouter from "./organizationRouter"
import opportunityRouter from "./opportunityRoutes"
import applicationsRouter from "./applicationRoutes"

const router= Router();
router.use('/volunteers',volunteerRouter)
router.use('/organizations',organizationRouter)
router.use('/opportunities',opportunityRouter)
router.use('/applications',applicationsRouter)

export  default router;