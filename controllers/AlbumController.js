


let model = require("../models/vip.js");


//////////////////////// L I S T E R     A L B U M S

module.exports.getAllPhoto = function(request, response){
   response.title = 'Album des stars';

    model.getAllPhoto(function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.allPhotos = result[0];
        console.log(result);
    } );

    response.render('listerAlbum', response);
  } ;


