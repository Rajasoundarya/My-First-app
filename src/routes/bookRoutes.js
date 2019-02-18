const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bookRouter = express.Router();
//const mysql = require('mysql');
const debug = require('debug')('app:bookRoutes');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'express'
// });

function router(nav){
  bookRouter.use((req, res, next)=>{
    if(req.user){
      next();
    }else{
      res.redirect('/');
    }
  })

  bookRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'books';

    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected Successfully to the SERVER!!!');

        const db = client.db(dbName);

        const col  = await db.collection('books');
        const books = await col.find().toArray();
        debug(books);
        res.render('bookListView', {
          nav,
          title: 'My title should be  here!',
          books
        });
      } catch(err){
        debug(err.stack);
      }
      client.close();
    }())
    bookRouter.route('/:id').get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'books';

      (async function mongo(){
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected Successfully to the SERVER!!!');

          const db = client.db(dbName);

          const col  = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id)});
          debug(book);
          res.render('bookView', {
            nav,
            title: 'My title should be  here!',
            book
          });
        }catch(err){
          debug(err.stack);
        }
        client.close();
      }())
    });
  });
  // const books = [
  //   {
  //     title: 'One Indian Girl',
  //     genre: 'Romance',
  //     author: 'Chetan Bhagat',
  //     read: false
  //   },
  //   {
  //     title: 'Kadal Pura',
  //     genre: 'History',
  //     author: 'Chantilyan',
  //     read: false
  //   },
  //   {
  //     title: 'Ramayanam',
  //     genre: 'epic',
  //     author: 'valmiki',
  //     read: false
  //   },
  //   {
  //     title: 'Three Idiots',
  //     genre: 'Thriller',
  //     author: 'Chetan Bhagat',
  //     read: false
  //   },
  //   {
  //     title: 'Harry Potter',
  //     genre: 'Thriller',
  //     author: 'J.K. Rowling',
  //     read: false
  //   }
  // ];

  // connection.query('SELECT * FROM books', function (error, books, fields) {
  //   if (error) throw error;
  //   bookRouter.route('/').get((req, res) => {
  //     res.render('bookListView', {
  //       nav,
  //       title: 'My title should be  here!',
  //       books
  //     });
  //   });
  //   bookRouter.route('/:id').get((req, res) => {
  //     const id = req.params.id;
  //     res.render('bookView', {
  //       nav,
  //       title: 'My title should be  here!',
  //       book: books[id]
  //     });
  //   });
    //debug(results);
    //console.log('The solution is: ', results);
  //})

  // bookRouter.route('/').get((req, res) => {
  //   res.render('bookListView', {
  //     nav,
  //     title: 'My title should be  here!',
  //     books
  //   });
  // });

  // bookRouter.route('/:id').get((req, res) => {
  //   const id = req.params.id;
  //   res.render('bookView', {
  //     nav,
  //     title: 'My title should be  here!',
  //     book: books[id]
  //   });
  // });
  return bookRouter;
}

module.exports = router;
