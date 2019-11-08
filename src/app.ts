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

export const v1 = Router();

v1.get('/', getHome);

v1.get('/users', getAllUsers);

v1.get('/user/:id', getUserDetail);

v1.get('/user/add', getAddUser);

v1.post('/add', postAddUser);

v1.get('/user/:id/edit', getUpdateUser);

v1.patch('/user/:id/edit', patchUpdateUser);

// v1.delete('user/:id', async (req, res) => {});

v1.use('/static', express.static(path.resolve('./', 'public')));
