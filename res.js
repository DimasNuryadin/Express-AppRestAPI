// Untuk code dijalankan lebih ketat
'use strict';

// Apakah data benar terupdate, bertambah, terhapus
exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
}