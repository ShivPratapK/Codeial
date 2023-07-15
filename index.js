const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

/*----------  Static files  ----------*/
app.use(express.static('./assets'));


/*----------  Using layouts of Express JS  ----------*/
app.use(expressLayouts);


/*----------  Extract Style and Scripts from sub pages into the Layout ----------*/
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


/*----------  Use Express router  ----------*/
app.use('/', require('./routes/index'))


/*----------  Set up the view engine  ----------*/
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, (err) =>{
    if(err){
        console.log(`Error in the running server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
});