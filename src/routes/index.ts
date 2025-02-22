import { Router} from "express";
import volunteerRouter from "./volunteerRoutes";
import organizationRouter from "./organizationRouter"

const router= Router();
router.use('/volunteer',volunteerRouter)
router.use('/organization',organizationRouter)

export  default router;