import { Router} from "express";
import volunteerRouter from "./volunteerRoutes"

const router= Router();
router.use('/volunteer',volunteerRouter)

export  default router;