import { Router} from "express";

import {OrganizationController } from "../controllers/organizationController";
const router= Router();
router.post('/create',OrganizationController.createOrganization);
router.get('/:id',OrganizationController.findOrganizationById);
router.get('/',OrganizationController.findOrganizations);
router.put('/:id',OrganizationController.updateOrganization);
router.delete('/:id',OrganizationController.deleteOrganization)
export default router;