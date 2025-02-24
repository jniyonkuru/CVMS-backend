import { Router} from "express";
import volunteerRouter from "./volunteerRoutes";
import organizationRouter from "./organizationRouter"
import opportunityRouter from "./opportunityRoutes"
import applicationsRouter from "./applicationRoutes"

const router= Router();
router.use('/volunteer',volunteerRouter)
router.use('/organization',organizationRouter)
router.use('/opportunity',opportunityRouter)
router.use('/applications',applicationsRouter)

export  default router;