//-------------------------------- express ----------------------------
const express = require('express');
// creation 
const app = express();

app.use(express.json());  // ou body parser , on intercepte toutes les requetes json


//------------------------- mongoDB ---------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EricG:Lolita60540@cluster0.9srzq.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//mongodb+srv://EricG:Lolita60540@cluster0.9srzq.mongodb.net/Cluster0?retryWrites=true&w=majority

const stuffRoutes = require('./routes/stuff');


//-------------------- new API --------------------

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());   // body parser

app.use('/api/stuff',stuffRoutes);

//--------------------------------------------------

// renvoi des infos 
module.exports = app;
