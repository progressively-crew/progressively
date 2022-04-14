import * as Joi from 'joi';

export interface ProjectCreationDTO {
  name: string;
}

export interface ProjectRetrieveDTO {
  uuid: string;
  name: string;
  createdAt: Date;
}

export interface MemberProjectDTO {
  email: string;
}

export const ProjectCreationSchema = Joi.object({
  name: Joi.string().required(),
});
