// Untuk code dijalankan lebih ketat
'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    // Menampilkan Semua data
    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);

    // Menampilkan data berdasarkan id
    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);

    // Tambah data pake method post
    app.route('/tambah')
        .post(jsonku.tambahdata);

    // Ubah data pake method put
    app.route('/ubah')
        .post(jsonku.ubahData);

    // Hapus data pake method delete
    app.route('/hapus')
        .post(jsonku.hapusData);

    // Route Nested #11
    app.route('/tampilmatakuliah')
        .get(jsonku.tampilgroupmatakuliah);
}