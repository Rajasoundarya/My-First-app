const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

const books = [
    {
      title: 'One Indian Girl',
      genre: 'Romance',
      author: 'Chetan Bhagat',
      read: false
    },
    {
      title: 'Kadal Pura',
      genre: 'History',
      author: 'Chantilyan',
      read: false
    },
    {
      title: 'Ramayanam',
      genre: 'epic',
      author: 'valmiki',
      read: false
    },
    {
      title: 'Three Idiots',
      genre: 'Thriller',
      author: 'Chetan Bhagat',
      read: false
    },
    {
      title: 'Harry Potter',
      genre: 'Thriller',
      author: 'J.K. Rowling',
      read: false
    }
  ];

function router(nav){
  adminRouter.route('/')
  .get((req,res)=>{
    const url = 'mongodb://localhost:27017';
    const dbName = 'books';

    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected Successfully to the SERVER!!!');

        const db = client.db(dbName);

        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch(err){
        debug(err.stack);
      }
      client.close();
    }())
  })
  return adminRouter;
}

module.exports = router;