const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Lidando com erros CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const rotasTipos = require('./rotas/rotasTipos')
const rotasPessoas = require('./rotas/rotasPessoas')

require('dotenv').config({path: '../.env'});
const bd = process.env.BD;

mongoose.connect(bd, {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/tipos', rotasTipos);
app.use('/pessoas', rotasPessoas);

module.exports = app;

//teste