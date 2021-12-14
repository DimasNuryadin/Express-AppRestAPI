// Untuk code dijalankan lebih ketat
'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan", res)
};


// Menampilkan semua data mahasiswa metode GET
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

// Menampilkan semua data mahasiswa berdasarkan id metode GET
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id; // Berdasarkan id ini
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};

// Menambah data mahasiswa metode POST
exports.tambahdata = function (req, res) {
    var nim = req.body.nim; // Body adalah data yang ingin kita post kan berdasarkan input dari user
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim, nama, jurusan],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasil Menambahkan Data", res)
            }
        }
    );
};