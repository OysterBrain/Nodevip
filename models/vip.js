let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};




module.exports.premiereLettre = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT(SUBSTR(VIP_NOM, 1,1)) AS lettre FROM vip ORDER BY 1;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getStars = function(lettre,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT VIP_NOM AS nom , VIP_PRENOM as prenom , p.PHOTO_ADRESSE as photo" +
                " FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE p.PHOTO_NUMERO = 1 AND VIP_NOM LIKE '"+lettre+"%'";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};


module.exports.getInfoStars = function(nom,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT VIP_NOM as nom, VIP_PRENOM as prenom, VIP_NAISSANCE as naissance,VIP_SEXE as sexe, " +
                "n.NATIONALITE_NOM as nationalite,VIP_TEXTE AS texte FROM vip v JOIN nationalite n ON v.NATIONALITE_NUMERO=n.NATIONALITE_NUMERO " +
                "WHERE VIP_NOM ='"+nom+"';";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoStar = function(nom,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT PHOTO_ADRESSE as photo FROM photo p JOIN vip v ON p.VIP_NUMERO=v.VIP_NUMERO WHERE VIP_NOM='"+nom+"';";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};


module.exports.getNomVips  = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT VIP_NOM as nom, VIP_PRENOM as prenom , VIP_NUMERO as id FROM vip ORDER BY 1 " ;

            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};


module.exports.getArticleStar  = function(id,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT ARTICLE_RESUME as article , ARTICLE_DATE_INSERT as date FROM article a " +
                "JOIN apoursujet ap ON a.ARTICLE_NUMERO=ap.ARTICLE_NUMERO WHERE ap.VIP_NUMERO =   "+id ;

            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};


module.exports.getAllPhoto = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {

            let sql = "SELECT VIP_NOM AS nom , VIP_PRENOM as prenom , p.PHOTO_ADRESSE as photo" +
                " FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE p.PHOTO_NUMERO = 1 ";
            //console.log(sql);
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};
