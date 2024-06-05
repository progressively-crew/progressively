import * as Joi from 'joi';

export class ProjectCreationDTO {
  name: string;
  domain: string;
}

export class UpdateProjectDTO {
  name: string;
  domain: string;
}

export interface ProjectRetrieveDTO {
  uuid: string;
  name: string;
  createdAt: Date;
}

export class AddMemberProjectDTO {
  email: string;
}

export const ProjectCreationSchema = Joi.object({
  name: Joi.string().required(),
  domain: Joi.string().required(),
});

export const UpdateProjectSchema = Joi.object({
  name: Joi.string().required(),
  domain: Joi.string().required(),
});
