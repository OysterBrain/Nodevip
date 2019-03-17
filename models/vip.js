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
module.exports.getMannequin = function(nom,pre,callback){
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql = "SELECT v1.VIP_NOM, DEFILE_LIEU as defile_lieu, DEFILE_DATE as defile_date, v2.VIP_NOM as couturier_nom FROM `vip` as v1 LEFT OUTER JOIN mannequin as m ON v1.VIP_NUMERO = m.VIP_NUMERO LEFT OUTER JOIN defiledans as d ON m.VIP_NUMERO = d.VIP_NUMERO LEFT OUTER JOIN defile ON  defile.DEFILE_NUMERO = d.DEFILE_NUMERO LEFT OUTER JOIN couturier as c ON defile.VIP_NUMERO = c.VIP_NUMERO LEFT OUTER JOIN  vip as v2 ON c.VIP_NUMERO = v2.VIP_NUMERO WHERE WHERE v.VIP_NUNMERO = '"+id+"'";
            connexion.query(sql, callback);
            connexion.release();
        }

    })
};

module.exports.getCouturier = function(nom,pre,callback){
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT VIP_NOM as nom, VIP_PRENOM as prenom, DEFILE_LIEU as defile_lieu, DEFILE_DATE as defile_date FROM defile as d JOIN couturier as c ON d.VIP_NUMERO = c.VIP_NUMERO JOIN vip as v ON c.VIP_NUMERO = v.VIP_NUMERO WHERE WHERE v.VIP_NUNMERO = '"+id+"'";
            connexion.query(sql, callback);
            connexion.release();
        }

    })
};

module.exports.getChanteur = function(nom,pre,callback){
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT VIP_NOM as nom , VIP_PRENOM as prenom, CHANTEUR_SPECIALITE as chanteur_specialite,ALBUM_TITRE as album_titre, ALBUM_DATE as album_date, MAISONDISQUE_NOM as maisondisque_nom FROM vip as v JOIN chanteur as ch ON v.VIP_NUMERO = ch.VIP_NUMERO JOIN composer as c ON ch.VIP_NUMERO = c.VIP_NUMERO JOIN album as a ON c.ALBUM_NUMERO = a.ALBUM_NUMERO JOIN maisondisque as md ON a.MAISONDISQUE_NUMERO=md.MAISONDISQUE_NUMERO WHERE WHERE v.VIP_NUNMERO = '"+id+"'";
            connexion.query(sql, callback);
            connexion.release();
        }

    })
};

module.exports.getRealisateur = function(nom,pre,callback){
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT v.VIP_NUMERO as num, VIP_NOM as nom, VIP_PRENOM as pre, FILM_TITRE as film_titre, FILM_DATEREALISATION  FROM vip as v JOIN realisateur as r ON v.VIP_NUMERO=r.VIP_NUMERO LEFT JOIN film as f ON r.VIP_NUMERO=f.VIP_NUMERO WHERE WHERE v.VIP_NUNMERO = '"+id+"'";
            connexion.query(sql, callback);
            connexion.release();
        }

    })
};

module.exports.getActeur = function(nom,pre,callback){
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT ACTEUR_DATEDEBUT as date_debut, ROLE_NOM as role, FILM_TITRE as film_titre, FILM_DATEREALISATION as film_date FROM vip as v JOIN acteur as a ON v.VIP_NUMERO=a.VIP_NUMERO LEFT JOIN joue as j ON a.VIP_NUMERO=j.VIP_NUMERO JOIN film as f ON j.FILM_NUMERO=f.FILM_NUMERO WHERE v.VIP_NUNMERO = '"+id+"'";
            connexion.query(sql, callback);
            connexion.release();
        }

    })
};