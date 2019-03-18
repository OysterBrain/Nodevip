


let model = require("../models/vip.js");
let async = require("async");
// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';

      response.render('repertoireVips', response);
  } ;


module.exports.premiereLettre = 	function(request, response){
    response.title = 'Répertoire';
    model.premiereLettre(function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.lettres = result;



        response.render('repertoireVips', response);
    } );
}

module.exports.getListStars = 	function(request, response){
    response.title = 'Répertoire';
    let lettre = request.params.lettre;
    async.parallel([
        function (callback){
            model.premiereLettre(function (err,result){callback(null,result)} );
            },
        function (callback){
            model.getStars(lettre,(function(errE,resE){callback(null,resE)}));
        },
    ],
    function (err,result){
        if(err){
            console.log(err);
            return;
        }
        response.lettres = result[0];
        response.infoStars = result[1];
        //console.log(result[0]);
        //console.log(result[1]);
        response.render('repertoireVips',response);
    }
    );
}




module.exports.getInfoStars = 	function(request, response){
    response.title = 'Répertoire Info de la star';
    let id = request.params.id;
    async.parallel([
            function (callback){
                model.premiereLettre(function (err,result){callback(null,result)} );
            },
            function (callback){
                model.getInfoStars(id,(function(errE,resE){callback(null,resE)}));
            },
            function (callback){
                model.getPhotoStar(id,(function(errEE,resEE){callback(null,resEE)}));
            },
            function (callback) {
                model.getMannequin(id, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getCouturier(id, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getChanteur(id, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getRealisateur(id, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getActeur(id, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getMariage(id, function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err,result){
            if(err){
                //console.log(err);
                return;
            }
            response.lettres = result[0];
            response.infoDeLaStar = result[1][0];
            response.photoStar = result[2];
            response.infoMannequin = result[3];
            response.infoCouturier = result[4];
            response.infoChanteur = result[5];
            response.infoRealisateur = result[6];
            response.infoActeur = result[7];
            response.infoMariage = result[8];

            console.log(result[8]);
            //console.log(result[2]);

            response.render('infoStar',response);
        }
    );
}


