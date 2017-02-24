var express = require('express');
var app = express();
var logger = require('./logger');


app.use(logger);

console.log('starting');
// app.get('/', function (req, response) {
//     response.sendFile(__dirname + '/public/index.html');
// });
app.use(express.static('public'));

app.get('/blocks', function (req, response) {
    var blocks = ['Fixed','movable','Rotating'];
    response.json(blocks);
});

app.listen(3000, function () {
    console.log('Running Express');
});