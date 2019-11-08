import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const postAddUser: RequestHandler = async (req, res) => {
  // no validation!
  const data = req.body;

  return User.query()
    .insert(data)
    .then(() => {
      console.log('user added');
      return res.status(201).redirect('/users');
    })
    .catch(err => {
      console.log('user not added', err);
      return res.status(500).redirect('/users');
    });

  // this code escape with an error
  // const user = await User.query().insert(data);
  // // req.params.id = user.id;
  // return getUpdateUser(req, res, next);
};
