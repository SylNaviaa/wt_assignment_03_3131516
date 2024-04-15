const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./models');
const session = require('express-session');

const app = express();

// Use express-session middleware
app.use(session({
  secret: '999999',
  resave: false,
  saveUninitialized: false
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.user !== undefined && req.session.user !== null;
  next();
});

// Set the views directory to the 'public' directory
app.set('views', path.join(__dirname, 'public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import route files
const indexRouter = require('./routes/home');
const articlesRouter = require('./routes/article');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
const createArticleRouter = require('./routes/createArticle');
const logoutRouter = require('./routes/logout');
const Article = require('./models/article');

// Mount routes on their respective paths
app.use('/', indexRouter);
app.use('/article', articlesRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/article/create', createArticleRouter);
app.use('/logout', logoutRouter);

// Route for fetching article details
app.get('/articleDetail/:id', (req, res) => {
  const articleId = req.params.id;
  // Fetch the article details from the database
  Article.findByPk(articleId)
    .then(article => {
      if (article) {
        // Article found, render the detail page
        res.render('articleDetail', { article });
      } else {
        // Article not found
        console.error('Article not found:', articleId);
        res.status(404).send('Article not found');
      }
    })
    .catch(err => {
      // Error fetching article
      console.error('Error fetching article:', err);
      res.status(500).send('Internal Server Error');
    });
});

// SQLite database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('config/database.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS Articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`); // Create Articles table

db.close(); // Close the database connection

// Sync Sequelize models with the database and start server
sequelize.sync().then(() => {
  console.log('All models synced with the database');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing models:', err);
});

module.exports = app;
