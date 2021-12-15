// Untuk code dijalankan lebih ketat
'use strict';

// Apakah data benar terupdate, bertambah, terhapus
exports.ok = function (values, res) {   // values untuk menangkap data json
    var data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
}

// Response untuk nested matakuliah (Foreign Key Database)  #11
exports.oknested = function(values, res){     // values untuk menangkap data json
    // Lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {   // reduce : untuk mengubah salah satu line menjadi single value
        // Tentukan key group
        if(akumulasikan[item.nama]) {
            // buat variable group nama mahasiswa
            const group = akumulasikan[item.nama];
            // Cek jika isi array adalah nama matakuliah
            if(Array.isArray(group.matakuliah)) {
                // Tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah);
            } else {
                // jika tidak, abaikan
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        } else {
            // Jika tidak, abaikan
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    // Agar ada status jika berhasil
    var data = {
        'status': 200,
        'values': hasil
    };

    // Ubah var data ke json
    res.json(data);
    res.end();
}