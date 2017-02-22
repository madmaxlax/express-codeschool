var express = require('express');
var app = express();

console.log('starting');
app.get('/', function (req, response) {
    response.send('Hello World'); //same as response.write() and response.end() which are node functions
});
app.get('/blocks', function (req, response) {
    response.redirect(301, '/parts');//301 says that redirect is permanent, rather than default 302 which is status code for temporary
});
app.get('/parts', function (req, response) {
    var blocks = ['Fixed', 'movable', 'rotating'];
    //response.send(blocks);
    response.json(blocks);
});

app.listen(3000, function () {
    console.log('Running Express');
});