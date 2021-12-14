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
        .put(jsonku.ubahData);
}