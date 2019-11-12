import { RequestHandler } from 'express';
import {
  getUserService,
  getUsersService,
  updateUserService,
  createUserService,
  deleteUserService,
} from '../services/users/userService';

export const getUsers: RequestHandler = async (request, response, next) => {
  const users = await getUsersService();
  return response.render('user-list', {
    title: 'Users List',
    users: users,
    message: 'List of Users',
  });
};

export const getUserDetail: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserService(id);
  return res.render('user-detail', {
    title: 'User Details',
    user: user,
  });
};

export const getUserCreate: RequestHandler = async (req, res) => {
  return res.render('user-add', {
    title: 'Add User',
  });
};

export const postUserCreate: RequestHandler = async (req, res) => {
  const data = req.body; // no validation!
  const user = await createUserService(data);

  if (user) {
    return res.status(201).redirect('/users');
  } else {
    return res.status(500).redirect('/users');
  }
};

export const getUserUpdate: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = (await getUserService(id)) || {};
  return res.render('user-edit', {
    title: 'Edit User',
    user: user,
  });
};

export const patchUserUpdate: RequestHandler = async (req, res, next) => {
  const user = req.body;
  const id = parseInt(req.params.id);
  user.id = id; // need this awkward shit to change string id in the user object to number type
  const updatedUser = await updateUserService(id, user);

  if (updatedUser) {
    return res.status(204).redirect('/users');
  } else {
    return res.status(500).redirect('/users');
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const user = await deleteUserService(id);
  if (user) {
    return res.status(200).redirect('/users');
  } else {
    return res.status(500).redirect(`/user/${id}`);
  }
};
