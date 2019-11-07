import path from 'path';
import express = require('express');
import { Router } from 'express';
import { getHome } from './general';
import { getAddUser } from './users/getAddUser';
import { postAddUser } from './users/postAddUser';
import { patchUser } from './users/patchUser';
import { getUserDetail } from './users/getUserDetail';

export const v1 = Router();

v1.get('/', getHome);

v1.get('/users', async (req, res) => {});

v1.get('/user/:id', getUserDetail);

v1.get('/add', getAddUser);

v1.post('/add', postAddUser);

v1.patch('/user/:id', patchUser);

// v1.delete('user/:id', async (req, res) => {});

v1.use('/static', express.static(path.resolve('./', 'public')));
