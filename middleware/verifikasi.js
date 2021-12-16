// Autentikasi user atau Role ?
// #15
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

// Untuk mengecek role berapa
function verifikasi(roles) {
    return function(req, res, next) {
        // Cek authorization header
        var tokenWithBearer = req.header.authorization;
        if(tokenWithBearer) {   // jika tokennya ada
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return resizeTo.status(401).send({auth:false, message:'Token tidak terdaftar!'});
                } else {
                    if(roles==2){   // Jika role 2 maka akan disambungkan ke halaman itu
                        req.auth = decoded;
                        next();
                    } else {    // Jika rolenya bukan 2 maka statusnya false
                        return rest.status(401).send({auth:false, message:'Gagal Mengotorisasi role anda!'});
                    }
                }
            });
        } else {
            return rest.status(401).send({auth:false, message:'Token tidak tersedia!'});
        }
    }
}

module.exports = verifikasi;