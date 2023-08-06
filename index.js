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


const MongoStore = require('connect-mongo');


/*----------  using SASS   ----------*/
const sassMiddleware = require('node-sass-middleware');
app.use(
    sassMiddleware({
        src: './assets/scss',
        dest: './assets/css',
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    })
)



app.use(express.urlencoded({extended: false}));


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


/*----------  MongoStore is used to store the Session Cookie in DataBase  ----------*/
app.use(session({
    name:'codeial',
    //TODO
    secret: 'blasomething',
    saveUninitialized: false,
    resave:false,
    cookie:{maxAge: (1000*100*40)},
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove: "disabled"
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


/*----------  Use Express router  ----------*/
app.use('/', require('./routes/index'));


app.listen(port, (err) =>{
    if(err){
        console.log(`Error in the running server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
});