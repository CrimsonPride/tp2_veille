const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

/**************FONCTIONS**********/

//Connexion à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_6', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8082, () => {
    console.log('connexion à la BD et on écoute sur le port 8082')
  })
})

//Appeler l'index.ejs pour l'affichage
app.get('/', function (req, res) {
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {carnet: resultat})

    }) 
    
});

//Ajouter un document
app.post('/Ajouter',  (req, res, next) => {
  db.collection('carnet_6').insertOne({
    "nom" : req.body.ajouter.nom,
    "prenom" : req.body.ajouter.prenom,
    "telephone": req.body.ajouter.telephone 
  }, (err, resultat) => {
        if (err) return res.send(500, err)
        var cursor = db.collection('carnet_6').find().toArray(function(err, resultat) {
            if (err) return console.log(err)
            console.log("err");
        })
    })
});

//Détruire un document
app.post('/Detruire/:_id',  (req, res) => {
    db.collection('carnet_6').findOneAndDelete({
        "_id": ObjectID(req.params._id)},(err, resultat) => {
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    
  }) 
})

//Modifier un document
app.post('/Modifier',  (req, res,next) => {
    db.collection('carnet_6').update({
     _id:ObjectID(req.body._id)},
     {
        $set: {
            nom: req.body.modifier.nom, 
            prenom: req.body.modifier.prenom, 
            telephone: req.body.modifier.telephone
        }
    }, (err, resultat) => {

    if(err) return res.send(500,err)
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    }) 
  }) 
})

//Triage des documents par nom lorsque l'on clique sur le th nom
var sensNom = 1;
app.get('/TNom',  (req, res, next) => {
    var cursor =
    db.collection('carnet_6').find().sort({ nom:sensNom }.toA, (err, resultat) => {

if (err) return console.log(err)
        res.render('index.ejs', {
            carnet: resultat
        })
        sensNom = -sensNom;
    })
});  

//Triage des documents par nom lorsque l'on clique sur le th nom
var sensNom = 1;
app.get('/TNom',  (req, res, next) => {
    var cursor =
    db.collection('carnet_6').find().sort({ nom:sensNom }.toA, (err, resultat) => {

if (err) return console.log(err)
        res.render('index.ejs', {
            carnet: resultat
        })
        sensNom = -sensNom;
    })
}); 

//Triage des documents par nom lorsque l'on clique sur le th prenom
var sensPrenom = 1;
app.get('/TPrenom',  (req, res, next) => {
    var cursor =
    db.collection('carnet_6').find().sort({ prenom:sensPrenom }.toA, (err, resultat) => {

if (err) return console.log(err)
        res.render('index.ejs', {
            carnet: resultat
        })
        sensPrenom = -sensPrenom;
    })
}); 

//Triage des documents par nom lorsque l'on clique sur le th telephone
var sensTel = 1;
app.get('/TTel',  (req, res, next) => {
    var cursor =
    db.collection('carnet_6').find().sort({ telephone:sensTel }.toA, (err, resultat) => {

if (err) return console.log(err)
        res.render('index.ejs', {
            carnet: resultat
        })
        sensTel = -sensTel;
    })
}); 