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

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8082, () => {
    console.log('connexion à la BD et on écoute sur le port 8082')
  })
})


app.get('/', function (req, res) {
   //console.log('la route route get / = ' + req.url)
   //Affiche la vue par défaut
    fs.readFile('views/index.ejs', function (err, data) {
   if (err) return console.error(err);
   res.send(data.toString());
    });
    
})

app.get('/fichier', function (req, res) {
   //console.log("je suis fichier");
   ////Lis le fichier collection_provinces.json
    fs.readFile("public/text/collection_provinces.json", 'utf8', function (err, data) {
       res.send(data);
       //console.log(data);
    
   });

})

app.get('/provinces', function (req, res) {
    //console.log("je suis provinces");
    //Lis le fichier collection_provinces.json et le mets en tableau
    fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
        if(err){
            console.log("erreur de lecture");
            return 
        }
        //Afiche le contenu de la BD
        res.render("index.ejs",{provinces: JSON.parse(data)})
    }); 
    
    
    
})

app.get('/collection',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {provinces: resultat})

    }) 
    

})

app.get('/ajouter', function (req, res) {
    //console.log("je suis ajouter");
    //Génère un nombre aléatoire pour la capitale
    var nb = (Math.random() *100 );
    //Ajoute une province au à la collection Provinces
    db.collection('provinces').insert(
        {"code": "QC",
         "nom": "Québec",
         "capital": nb}
    )
    //Renvoi à Collection
    res.redirect('/collection')
})

app.get('/detruire', function (req, res) {
    //console.log("je suis plusieurs");
    //Supprime la base de donnée
    db.dropDatabase()
    //Renvoi à Collection
    res.redirect('/collection')
})

app.get('/plusieurs', function (req, res) {
    //console.log("je suis plusieurs");
    //Rajoute un lot de données
    db.collection("provinces").insertMany( [	
			{
			 "code": "NF" ,
			 "nom" : "Terre-Neuve",
			 "capital" : "St-john"
			},
			{
			  "code": "IPE",
			  "nom" : "Ile du Prince-Édouard ",
			  "capital" : "Charlottetown"
			},
			{
			  "code": "NS",
			  "nom" : "Nouvelle Écosse",
			  "capital" : "Halifax"
			},			
			{
			  "code": "NB",
			  "nom" : "Nouveau-Brunswick",
			  "capital" : "Fredericton"
			},
			{
			"code": "QC",  
			"nom" : "Québec",
			"capital" : "Québec"
			},
	 		{
			"code": "ON", 
			"nom" : "Ontario",
			"capital" : "Toronto"
			},
	 		{
			"code": "MA", 
			"nom" : "Manitoba",
			"capital" : "Winipeg"
			},
	 		{
			"code": "SK", 
			"nom" : "Saskatshewan",
			"capital" : "Regina"
			},
	 		{
			"code": "AL", 
			"nom" : "Alberta",
			"capital" : "Edmonton"
			},
			{
			  "code": "BC",
			  "nom" : "Colombie Britannique",
			  "capital" : "Victoria"
			},
			{
			  "code": "NU",
			  "nom" : "Nunavut",
			  "capital" : "Igaluit"
			},
			{
			  "code": "YT",
			  "nom" : "Yukon",
			  "capital" : "Whitehorse"
			},
			{
			  "code": "NT",
			  "nom" : "Territoire du Nord-Ouest",
			  "capital" : "Yellowknife"
			}

		]	
    )
    
    //Renvoi à Collection
    res.redirect('/collection')
})