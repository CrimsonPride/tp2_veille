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

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_6', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8082, () => {
    console.log('connexion à la BD et on écoute sur le port 8082')
  })
})


app.get('/', function (req, res) {
    console.log("dans fonction");
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    console.log("dans db");
    res.render('index.ejs', {carnet: resultat})

    }) 
    
})


app.get('/Ajouter', function (req, res) {
    //console.log("je suis ajouter");
    //Génère un nombre aléatoire pour la capitale
   
    //Ajoute une province au à la collection Provinces
    db.collection('carnet_6').insert(
        {"nom": "",
         "prenom": "",
         "telephone":""}
    )
    //Renvoi à Collection
    res.redirect('/')
})

app.get('/Detruire/:_id',  (req, res) => {

    db.collection('carnet_6').findOneAndDelete({nom:"Lauzon"}, (err, resultat) => {

    if(err) return res.send(500,err)
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    }) 
  }) 
})

app.post('/Modifier',  (req, res) => {

    db.collection('carnet_6').update({_id:req.body._id},{$set:{'nom':req.body.nom, 'prenom':req.body.prenom, 'telephone':req.body.telephone}}, (err, resultat) => {

    if(err) return res.send(500,err)
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    }) 
  }) 
})

app.get('/TNom',  (req, res) => {
    db.collection('carnet_6').find( { $query: {}, $orderby: { nom: "A" } } )
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    
}) 
  