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
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {carnet: resultat})

    }) 
    
})

app.get('/Afficher',  (req, res) => {
   
   console.log('la route  get / = ' + req.url)
   res.sendFile(__dirname + "/public/html/forme.html")
})


app.post('/Ajouter',  (req, res) => {
  db.collection('carnet_6').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      res.redirect('/')
    })
})


app.get('/Detruire/:_id',  (req, res) => {
     var id = req.params._id
    console.log(id)
    db.collection('carnet_6').findOneAndDelete({"_id": ObjectID(req.params._id)}, (err, resultat) => {

    if(err) return res.send(500,err)
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    }) 
  }) 
})


app.get('/Yolo',  (req, res) => {

     var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la base de donnée
    console.log(req.url.slice(-1));
    res.render('index1.ejs', {carnet: resultat, id:req.url.slice(-1)})
    }) 
})

app.get('/Modifier/:_id',  (req, res) => {
   var id = req.params._id
    console.log();
    db.collection('carnet_6').findAndModify({
    query: {_id:ObjectID(req.body._id)},
    update: {$set: {nom: req.body.nom, prenom: req.body.prenom, telephone: req.body.telephone}},
    new: true
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

app.get('/Ding',  (req, res) => {
   var id = req.params._id
    console.log();
    db.collection('carnet_6').findAndModify({
    query: {_id:ObjectID(req.body._id)},
    update: {$set: {nom: req.body.nom, prenom: req.body.prenom, telephone: req.body.telephone}},
    new: true
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

app.get('/TNom',  (req, res) => {
    
    
    db.collection('carnet_6').find().sort({ nom: -1 }, (err, resultat) => {

    if(err) return res.send(500,err)
    var cursor = db.collection('carnet_6').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la base de donnée
    res.redirect('/');
    }) 
  }) 
})
  