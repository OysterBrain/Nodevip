

let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');
let ArticleController = require('./../controllers/ArticleController');



// Routes
module.exports = function(app){

  // tests à supprimer
    app.get('/test', TestController.Test);

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.premiereLettre);
    app.get('/repertoire/:lettre', VipController.getListStars);
    app.get('/repertoire/Info/:nom',VipController.getInfoStars);

 // albums
   app.get('/album', AlbumController.getAllPhoto);

 //Article
    app.get('/articles', ArticleController.getNomVips);
    app.get('/articles/:id', ArticleController.getAllArticle);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
