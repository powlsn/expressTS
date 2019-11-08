import path from 'path';
import express = require('express');
import { Router } from 'express';
import { getHome } from './getHome';
import { getAddUser } from './users/getAddUser';
import { postAddUser } from './users/postAddUser';
import { patchUpdateUser } from './users/patchUpdateUser';
import { getUserDetail } from './users/getUserDetail';
import { getAllUsers } from './users/getAllUsers';
import { getUpdateUser } from './users/getUpdateUser';
import { deleteUser } from './users/deleteUser';

export const userRouter = Router();

userRouter.get('/', getHome);

userRouter.get('/users', getAllUsers);

userRouter.get('/users/add', getAddUser);

userRouter.get('/users/:id', getUserDetail);

userRouter.post('/users', postAddUser);

userRouter.get('/users/:id/edit', getUpdateUser);

userRouter.patch('/users/:id/edit', patchUpdateUser);

userRouter.delete('/users/:id/delete', deleteUser);

userRouter.use('/static', express.static(path.resolve('./', 'public')));
