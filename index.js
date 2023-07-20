const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


/*----------  Use for Session Cookie  ----------*/
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded({extended: true}));


/*----------  Using Cookie  ----------*/
app.use(cookieParser());


/*----------  Static files  ----------*/
app.use(express.static('./assets'));


/*----------  Using layouts of Express JS  ----------*/
app.use(expressLayouts);


/*----------  Extract Style and Scripts from sub pages into the Layout ----------*/
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


/*----------  Set up the view engine  ----------*/
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'codeial',
    //TODO
    secret: 'blasomething',
    saveUninitialized: false,
    resave:false,
    cookie:{maxAge: (1000*100*40)}
}));
app.use(passport.initialize());
app.use(passport.session());


/*----------  Use Express router  ----------*/
app.use('/', require('./routes/index'));


app.listen(port, (err) =>{
    if(err){
        console.log(`Error in the running server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
});