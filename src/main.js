const fs = require('fs');
var cors = require('cors') //use this
const hbs = require('hbs');
const path = require('path');
// const morgan = require('morgan');
const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('./config/ATN.db');
const route = require('./routes/index.Route.js');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const formidable = require('express-formidable');


//Import modules

const app = express();
const port = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
//middlewares
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('layout', path.join(__dirname, 'app', 'views', 'layout'));
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        isStaff: (p, q, options) => {
            return (p == q) ? options.fn(this) : options.inverse(this);
        },
        isGreaterThan: (p, q, options) => {
            return (p > q) ? options.fn(this) : options.inverse(this);
        },
        summary: (string) => {
            return string.substring(0, 60) + '...';
        }
    },
}));

route(app);

db.connect();


app.listen(port, () => console.log(`Example app listening on port ${port}!`));