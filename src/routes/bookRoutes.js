const express = require('express');
//const { MongoClient, ObjectID } = require('mongodb');
const bookRouter = express.Router();
//const mysql = require('mysql');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsServices');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'express'
// });

function router(nav){
  const { getIndex,getById,middleware } = bookController(nav, bookService);
  bookRouter.use(middleware);

  bookRouter.route('/')
  .get(getIndex);
  bookRouter.route('/:id').get(getById);
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
