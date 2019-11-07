import { RequestHandler } from 'express';
import { getAddUser } from './getAddUser';
import { User } from '../../models/User';

export const postAddUser: RequestHandler = async (req, res, next) => {
  // WTF code
  let data = req.body;
  data = JSON.parse(JSON.stringify(data));
  // WTF code

  User.query()
    .insert(data)
    .then(() => {
      console.log('user added');
      getAddUser(req, res, next);
    })
    .catch(err => {
      console.log('user not added', err);
    });
};
