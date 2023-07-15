const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.on('err', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open',() =>{
    console.log('Connected to DataBase :: MongoDB');
});

module.exports = db;
