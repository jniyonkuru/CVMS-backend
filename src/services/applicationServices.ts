import { IApplication } from "../models/application";
import { ApplicationRepository } from "../repositories/applicationRepository";
import { ApplicationValidationSchema, UpdateApplicationValidationSchema } from "../utils/applicationValidation";

class ApplicationServices {
  private repository: ApplicationRepository;
  private validator = ApplicationValidationSchema;
  private updateValidator = UpdateApplicationValidationSchema;

  constructor(repository: ApplicationRepository) {
    this.repository = repository;
  }

  async createOpportunity(applicationData: IApplication): Promise<IApplication> {

    return  await this.repository.create(applicationData);
  
  }

  async findApplication(id: string): Promise<IApplication| null> {
     return await this.repository.findById(id);
   
  }

  async updateApplication(updateData: Partial<IApplication>, id: string): Promise<IApplication|null> {
  
    return await this.repository.update(id, updateData);

}
  

  async deleteApplication(id: string): Promise<void> {
  
    return await this.repository.delete(id);
  }

  async findApplications(filter: Record<string, any>): Promise<IApplication[]> {
    return await this.repository.find(filter);
  }
}

export default ApplicationServices;