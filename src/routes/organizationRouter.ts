import { Router} from "express";

import {OrganizationController } from "../controllers/organizationController";
import { Middleware } from "../middlewares/Middlewares";
const router= Router();
router.post('/create',OrganizationController.createOrganization);
router.get('/:id',OrganizationController.findOrganizationById);
router.get('/',OrganizationController.findOrganizations);
router.put('/:id',Middleware.authentication('organization'),OrganizationController.updateOrganization);
router.delete('/:id',Middleware.authentication('organization'),OrganizationController.deleteOrganization)
export default router;