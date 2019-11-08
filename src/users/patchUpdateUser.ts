import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const patchUpdateUser: RequestHandler = async (req, res, next) => {
  const requestUser = req.body;
  const userID = parseInt(requestUser.id);
  requestUser.id = userID;

  return User.query()
    .findById(req.params.id)
    .patch(requestUser)
    .then(() => {
      console.log('user edited');
      return res.status(204).redirect('/users');
    })
    .catch(err => {
      console.log('user not edited', err);
      return res.status(500).redirect('/users');
    });
};
