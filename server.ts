import express from 'express';

const Knex = require('knex');
const knexConfig = require('./knexfile');

const { Model } = require('objection');
const { User } = require('./models/User');

const knex = Knex(knexConfig.development);

Model.knex(knex);

const app = express();

app.get('/', async (req, res) => {
  const users = await User.query();
  console.log(users);
  res.render('home', {
    title: 'Hey',
    users: users,
    message: 'App List Users',
  });
});

app.set('view engine', 'pug');
app.set('views', ['./views/templates/']);

app.use('/static', express.static('public'));

app.listen(3000, () => {
  console.log('Server started...');
});

// const person = animal.person // owner
// const person = animal.person // doc

// const person = animal.doc
// const person = animal.owner

// document.versions // all
// document.current // get versions order by desc take first

// photo = new Photo();
// photo.author => undefined
// author.photos.add(photo);  // implicit: photo.author = author;

// class Animal
//   belongs_to :owner, className: Person
//

// import { Server } from 'express'

// *.js
// function foo (flag) { ... return something }

// *.d.ts
// foo(flag: boolean): Something

// const promise = service.getSomething => Promise<User>;

// promise.then(result => console.log(result)

// const user = await promise;
// console.log(user);

// promise
//   .then(result => console.log(result))
//   .catch(error => console.log(error))

// try {
//   const user = await promise;
//   console.log(user)
// } catch (error) {
//    console.log(error)
// }

// let user;
// promise
//   .then(result => );

// makeUser(): Promise<User> {
//  return Promise<User>
// }

// factory.makeUser()
//    .then(user1 => factory.makeUser()
//       .then(user2 => {
//         .then(user3 => {
//            doSth();

// Promise.all([
//   factory.makeUser(),
//   factory.makeUser(),
//   factory.makeUser(),
//]).then(users => {
//   do(users)
//})

// async selectPayedOrders(): Promise<Orders> {
//   const orders = await getOrders();
//   const accounts = await accounts(orders);
//   const payedOrders = selectIfAccount(orders, accounts)
//   return payedOrder;
//}

// async selectPayedOrders(): Promise<Orders> {
//   return Promise.all([
//      getOrders(),
//      accounts(orders)
//   ]).then(orders, accounts => {
//      return selectIfAccount(orders, accounts)
//   }
//}

// (async () => {
//   const conn = await getDatabaseConnection()
//   console.log(conn)
// })()

// async function foo () => {
//   const conn = await getDatabaseConnection()
//   console.log(conn)
// })
// foo();
// END OF FILE
