const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

const { isAuth } = require('./middlewares/authMiddleware');

const PORT = 3000;

// config express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(isAuth);
app.use(express.urlencoded({ extended: false }));
app.use(router);

// config handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        'eq': function (a, b) {
            return a == b;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// start server
mongoose.connect('mongodb://localhost:27017/cosmic-explorer')
    .then(() => {
        app.listen(PORT, () => {
            console.log('DB Connected');
            console.log('Server is listening on http://localhost:' + PORT);
        })
    })
