const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const tasksRoutes = require('./api/routes/tasks');


mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@node-rest-rent-aeybq.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser :true,
useUnifiedTopology: true});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Conent-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes which handle requests 
app.use('/tasks', tasksRoutes);

//handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;