// Memanggil library dari mysql
var mysql = require('mysql');

//Buat Koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbrestapi'
})

conn.connect((err) => {
    if(err) throw err;
    console.log('Mysql terkoneksi');
});

module.exports = conn;