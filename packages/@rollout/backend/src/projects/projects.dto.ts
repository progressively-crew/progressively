import * as Joi from 'joi';

export interface ProjectCreationDTO {
  name: string;
}

export interface ProjectRetrieveDTO {
  uuid: string;
  name: string;
  createdAt: Date;
}

export const ProjectCreationSchema = Joi.object({
  name: Joi.string().required(),
});
