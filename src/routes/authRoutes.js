const express = require('express');
//const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
//const passport = require('passport');
const authRouter = express.Router();
const authController = require('../controllers/authController');

function router(nav){
  const {createUser} = authController();
  authRouter.route('/signUp')
  .post(createUser)
      // debug(req.body);
      // const url = 'mongodb://localhost:27017';
      // const dbName = 'books';
      // const { username, password } = req.body;

      // (async function addUser(){
      //   let client;
      //   try {
      //     client = await MongoClient.connect(url);
      //     debug('Connected Successfully to the SERVER!!!');

      //     const db = client.db(dbName);

      //     const col  = await db.collection('users');
      //     const user = {username, password};
      //     const results = await col.insertOne(user);
      //     debug(results);
      //     req.login(results.ops[0], ()=>{
      //       res.redirect('/auth/profile');
      //     })
      //   }catch(err){
      //     debug(err.stack);
      //   }
      //   client.close();
      // }())
      //create user

    //});

  // authRouter.route('/signIn')
  // .get((req,res)=>{
  //   res.render('signin', {
  //     nav,
  //     title: 'Sign In'
  //   });
  // })
  // .post(passport.authenticate('local', {
  //   successRedirect: '/auth/profile',
  //   failureRedirect: '/'
  // }));

  authRouter.route('/profile')
  .all((req, res, next)=>{
     if(req.user){
       next();
     }else{
       res.redirect('/');
     }
  })
  .get((req,res)=>{
    debug(req.user);
    res.json(req.user);
  });
  return authRouter;
}
module.exports = router;
