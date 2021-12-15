// Akan buat router Registrasi, Login / beberapa url yang akan di cek apakah dia public atau alamat url yang harus pakai token

var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

// Controller untuk register
exports.registrasi = function(req, res) {   // Function untuk mengambil data dari body misal username dan password
    var post = {    // Data akan di tampung di sini/array
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),   // Karna akan pakai md5 tambahkan function md5
        role: req.body.role,
        tanggal_daftar: new Date()  // Akan menyesuaikan tanggal berapa ia daftar
    }

    // Apakah emailnya sudah terdaftar apa belum
    var query = "SELECT email FROM ?? WHERE??"; // Panggil table
    var table = ["user", "email", post.email];  // Emailnya terdaftar?

    query = mysql.format(query, table); // Akan menjalankan query panggil table

    connection.query(query, function(error, rows){
        if (error) {
            console.log(error);
        } else {
            if(rows.length == 0){   // Jika belum terdaftar maka = insert user
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];   // cek dulu di table user
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if (error){
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data baru", res);
                    }
                });
            } else {    // Jika tidak maka tampilkan Emal sudah terdaftar
                response.ok("Email sudah terdaftar");
            }
        }
    })

}