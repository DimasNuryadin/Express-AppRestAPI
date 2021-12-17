// Autentikasi user atau Role ?
// #15
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

// Untuk mengecek role 1
function verifikasiUser1() {
    return function (req, rest, next) {
        var role = req.body.role; // Parameter, bisa di input sendiri
        // Cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) { // jika tokennya ada
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({
                        auth: false,
                        message: 'Token tidak terdaftar!'
                    });
                } else {
                    if (role == 1) { // Jika role 2 maka akan disambungkan ke halaman itu
                        req.auth = decoded;
                        next();
                    } else { // Jika rolenya bukan 2 maka statusnya false
                        return rest.status(401).send({
                            auth: false,
                            message: 'Gagal Mengotorisasi role anda!'
                        });
                    }
                }
            });
        } else {
            return rest.status(401).send({
                auth: false,
                message: 'Token tidak tersedia!'
            });
        }
    }
}

// Untuk mengecek role 2
function verifikasiUser2() {
    return function (req, rest, next) {
        var role = req.body.role; // Parameter, bisa di input sendiri
        // Cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) { // jika tokennya ada
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({
                        auth: false,
                        message: 'Token tidak terdaftar!'
                    });
                } else {
                    if (role == 2) { // Jika role 2 maka akan disambungkan ke halaman itu
                        req.auth = decoded;
                        next();
                    } else { // Jika rolenya bukan 2 maka statusnya false
                        return rest.status(401).send({
                            auth: false,
                            message: 'Gagal Mengotorisasi role anda!'
                        });
                    }
                }
            });
        } else {
            return rest.status(401).send({
                auth: false,
                message: 'Token tidak tersedia!'
            });
        }
    }
}

module.exports = verifikasiUser1;
module.exports = verifikasiUser2;