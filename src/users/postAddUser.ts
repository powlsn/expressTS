import { RequestHandler } from 'express';
import { getAddUser } from './getAddUser';
import { User } from '../../models/User';
import { getUpdateUser } from './getUpdateUser';

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
  // const user = await User.query().insert(data);
  // // req.params.id = user.id;
  // return getUpdateUser(req, res, next);
};
