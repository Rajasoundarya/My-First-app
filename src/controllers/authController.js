const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug') ('app:authController');

function authController(){
  function createUser(req, res){
    debug(req.body);
    const url = 'mongodb://localhost:27017';
    const dbName = 'MyFirstApp';
    const { email, username, password, DOB, role} = req.body;
    console.log(req.body);

    (async function addUser(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected Successfully to the SERVER!!!');

        const db = client.db(dbName);

        const col  = await db.collection('users');
        const user = {email, username, password, DOB, role};
        const results = await col.insertOne(user);
        debug(results);
        req.login(results.ops[0], ()=>{
          res.send("success: The user is created successfully");
          //res.redirect('/auth/profile');
        })
      }catch(err){
        debug(err.stack);
        res.send('Creating user failed! Please contact your admin');
      }
      client.close();
    }())
  }
  return {
    createUser
  };
}

module.exports =  authController;