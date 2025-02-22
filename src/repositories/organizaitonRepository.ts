import { IOrganization } from "../models/organization";

import { GenericRepository } from "./genericRepository";
import { Organization } from "../models/organization";

 export class OrganizationRepository extends GenericRepository<IOrganization>{
    constructor(){
        super(Organization)

    }
}