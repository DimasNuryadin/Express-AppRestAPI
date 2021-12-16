// Kuliah #14
// Akan buat router Registrasi, Login / beberapa url yang akan di cek apakah dia public atau alamat url yang harus pakai token

var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

// Controller untuk register
exports.registrasi = function (req, res) { // Function untuk mengambil data dari body misal username dan password
    var post = { // Data akan di tampung di sini/array
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password), // Karna akan pakai md5 tambahkan function md5
        role: req.body.role,
        tanggal_daftar: new Date() // Akan menyesuaikan tanggal berapa ia daftar
    }

    // Apakah emailnya sudah terdaftar apa belum
    var query = "SELECT email FROM ?? WHERE??=?"; // Panggil table
    var table = ["user", "email", post.email]; // Emailnya terdaftar?

    query = mysql.format(query, table); // Akan menjalankan query panggil table

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) { // Jika belum terdaftar maka = insert user
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"]; // cek dulu di table user
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data baru", res);
                    }
                });
            } else { // Jika tidak maka tampilkan Emal sudah terdaftar
                response.ok("Email sudah terdaftar", res);
            }
        }
    })
}

// Controller untuk login
exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        username: req.body.username
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "username", post.username];

    query = mysql.format(query, table);
    // Koneksikan dengan mysql
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) { // Jika datanya ada
                var token = jwt.sign({
                    rows
                }, config.secret, {
                    expiresIn: 1440 // Token ini akan hangus 50 menit
                });
                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address() // Mengecek Ip Address Komputer
                }
                // Jika datanya sudah tertampung, lalu akan memasukan datanya di tabel akses token dengan kode dibawah

                var query = "INSERT INTO ?? SET?"; // Untuk menampung data
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else { // jika berhasil maka akan menampilkan berikut =
                        res.json({ // tampilkan data json bentuknya =
                            success: true,
                            message: 'Token JWT Tergenerate',
                            token: token,
                            currUser: data.id_user
                        })
                    }
                });

            } else {
                res.json({
                    "Error": true,
                    "Message": "Username atau password salah!"
                });
            }
        }
    });
};


// Halaman buat test Role   # 16
exports.halamanRahasia = function(req, res) {
    response.ok("Halaman ini hanya untuk user dengan role = 2!");
}