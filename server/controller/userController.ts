// import { User } from '../models/User';
// import { transaction } from 'objection';
// import { User } from '../src/entity/User';
// import { Repository, getConnection } from 'typeorm';
// import { repository } from '../server';
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../src/entity/User';


export const getUsers = async (request: Request, response: Response) => {
  const user = getConnection().getRepository(User)
  // if(repository !== undefined) {
  //   user = await repository.find();
  // }

  return response.render('user-list', {
    title: 'Users List',
    users: user,
  });
};

// export const getUserDetail: RequestHandler = async (request, response) => {
//   // const user = await User.query().findById(request.params.id);

//   return response.render('user-detail', {
//     title: 'User Details',
//     // user: user,
//   });
// };

// export const getUserCreate: RequestHandler = async (request, response) => {
//   return response.render('user-add', {
//     title: 'Add User',
//   });
// };

// export const postUserCreate: RequestHandler = async (request, response) => {
//   // const user = await User.query().insert(request.body);

//   // if (user) {
//     return response.status(201).redirect('/users');
//   // } else {
//     // return response.status(500).redirect('/users');
//   // }
// };

// export const getUserUpdate: RequestHandler = async (request, response) => {
//   // const user = await User.query().findById(request.params.id);
//   return response.render('user-edit', {
//     title: 'Edit User',
//     // user: user,
//   });
// };

// export const patchUserUpdate: RequestHandler = async (request, response) => {
//   // this code comes from the official repo

//   // const graph = request.body;

//   // // Make sure only one User was sent.
//   // if (Array.isArray(graph)) {
//   //   return response.status(400).redirect('/users');
//   // }

//   // // Make sure the user has the correct id because `upsertGraph` uses the id fields
//   // // to determine which models need to be updated and which inserted.
//   // graph.id = parseInt(request.params.id, 10);

//   // // It's a good idea to wrap `upsertGraph` call in a transaction since it
//   // // may create multiple queries.
//   // const upsertedGraph = await transaction(User.knex(), trx => {
//   //   return (
//   //     User.query(trx)
//   //       // For security reasons, limit the relations that can be upserted.
//   //       .upsertGraph(graph)
//   //   );
//   // });
//   return response.status(204).redirect('/users');
// };

// export const deleteUser: RequestHandler = async (request, response) => {
//   // const user = await User.query().deleteById(request.params.id);

//   // if (!user) {
//     return response.status(500).redirect(`/users`);
//   // } else {
//     // return response.status(200).redirect('/users');
//   // }
// };
