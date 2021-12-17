// Akan daftarkan controller register
var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require("./verifikasi");

// Daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
// Daftarkan menu Login
router.post('/api/v1/login', auth.login);

// Alamat yang perlu otorisasi #16
router.get('/api/v1/rahasia', verifikasi(), auth.halamanUser1);
router.get('/api/v1/rahasia', verifikasi(), auth.halamanUser2);  // Verifikasi yang rolenya 2 dan apakah punya token
router.get('/api/v1/rahasia', verifikasi(), auth.halamanAdmin);

module.exports = router;