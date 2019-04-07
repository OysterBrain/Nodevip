let model = require("../models/vip.js");
let async = require("async");

module.exports.getConnexion = 	function(request, response) {
    let id = request.body.identifiant;
    let mdp = request.body.motdepasse;
    model.getConnexion(function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.connexion = result;
        response.id = id;
        response.mdp = mdp;
        console.log(response.connexion);
        response.render('connexion', response);
    } );
}