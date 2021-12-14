const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse application/json
// Ketik bodyparser.url dan bodyparser.json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Panggil Routes
var routes = require('./routes');
routes(app);

// Lokasi Server
app.listen(3000, () => {
    console.log('Server started on port');
})