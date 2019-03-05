
let model = require("../models/vip.js");
let async = require("async");

module.exports.getNomVips = 	function(request, response){
    response.title = 'Articles';

    model.getNomVips(function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.Vips = result;

        response.render('Article', response);
    } );
}


module.exports.getAllArticle = 	function(request, response){
    response.title = 'Répertoire';
    let id = request.params.id;
    async.parallel([
            function (callback){
                model.getNomVips(function (err,result){callback(null,result)} );
            },
            function (callback){
                model.getArticleStar(id,(function(errE,resE){callback(null,resE)}));
            },
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.Vips = result[0];
            response.ArticleStar = result[1];
            response.render('Article',response);
        }
    );
}


