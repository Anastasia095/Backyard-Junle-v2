const path = require('path');
const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
var bodyParser = require('body-parser');
// const multer = require('multer');

// const fileStorageEngine = multer.disckStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images')
//   },
//   filename: (req, file,cb) => {
//     cb(null, Date.now() + '--' + file.originalname)
//   }
// });

// const upload = multer({ storage: fileStorageEngine});

const sequelize = require('./config/connection');
const app = express();
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


const PORT = process.env.PORT || 3001

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
app.use(express.json());
// app.use(require('body-parser').urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(routes)
app.use(express.static(path.join(__dirname, 'public')))

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
