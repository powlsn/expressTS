import { Request } from 'express';
import { User } from '../entity/User.entity';

export const requestUserMapper = (request: Request): User => {
  return Object.assign(new User(), {
    id: request.params.id ? parseInt(request.params.id) : undefined,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
  });
};
