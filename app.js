const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const nav = [
  { link: '/authors', category: 'authors' },
  { link: '/books', category: 'books' }
];

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(
  '/css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
);
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/jquery/dist'))
);
app.set('views', './src/views');
app.set('view engine', 'ejs');

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render('index', {
    nav: [
      { link: '/authors', category: 'authors' },
      { link: '/books', category: 'books' }
    ],
    title: 'My title should be  here!'
  });
});

app.listen(port, () => {
  debug(`Listening to port ${chalk.green(port)}`);
});
