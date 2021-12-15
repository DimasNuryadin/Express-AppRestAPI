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
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasil Menambahkan Data", res)
            }
        }
    );
};

// Mengubah data mahasiswa berdasarkan id metode put
exports.ubahData = function (req, res) {
    var id = req.body.id_mahasiswa;

    var nim = req.body.nim; // Body adalah data yang ingin kita post kan berdasarkan input dari user
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data Berhasil Diubah", res)
            }
        }
    );
};

// Menghapus data berdasarkan id
exports.hapusData = function (req, res) {
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data Berhasil Dihapus", res);
            }
        }
    );
}

// Menampilkan matakuliah group     #11
exports.tampilgroupmatakuliah = function(req, res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa;',
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.oknested(rows, res);
            }
        }
    );
    
}