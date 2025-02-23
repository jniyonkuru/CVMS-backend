import { Router} from "express";
import volunteerRouter from "./volunteerRoutes";
import organizationRouter from "./organizationRouter"
import opportunityRouter from "./opportunityRoutes"

const router= Router();
router.use('/volunteer',volunteerRouter)
router.use('/organization',organizationRouter)
router.use('/opportunity',opportunityRouter)

export  default router;