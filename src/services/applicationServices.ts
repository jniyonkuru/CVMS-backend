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
    const validationResult = this.validator.safeParse(applicationData);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }

    const { volunteerId, opportunityId } = applicationData;
    const exists = await this.repository.find({ volunteerId, opportunityId });
    if (exists.length > 0) {
      throw new Error("This user has already applied to this opportunity.");
    }

    const application = await this.repository.create(applicationData);
    return application;
  }

  async findApplication(id: string): Promise<IApplication> {
    const application = await this.repository.findById(id);
    if (!application) {
      throw new Error("Application with the given ID was not found.");
    }
    return application;
  }

  async updateApplication(updateData: Partial<IApplication>, id: string): Promise<IApplication> {
    const application = await this.repository.findById(id);
    if (!application) {
      throw new Error("Application with the given ID was not found.");
    }

    const validationResult = this.updateValidator.safeParse(updateData);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }

    const immutableFields = ["opportunityId", "volunteerId", "applicationDate"];
    for (const field of immutableFields) {
      if (updateData[field as keyof IApplication]) {
        throw new Error(`Field '${field}' cannot be updated.`);
      }
    }

    const updatedApplication = await this.repository.update(id, updateData);
    if (!updatedApplication) {
      throw new Error("Failed to update the application.");
    }
    return updatedApplication;
  }

  async deleteApplication(id: string): Promise<void> {
    const application = await this.repository.findById(id);
    if (!application) {
      throw new Error("Application with the given ID was not found.");
    }
    await this.repository.delete(id);
  }

  async findApplications(filter: Record<string, any>): Promise<IApplication[]> {
    return await this.repository.find(filter);
  }
}

export default ApplicationServices;