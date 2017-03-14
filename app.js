var express = require('express');
var app = express();
var logger = require('./logger');

app.use(logger);

console.log('starting');
// app.get('/', function (request, response) {
//     response.sendFile(__dirname + '/public/index.html');
// });
app.use(express.static('public'));


var blocks = require('./routes/blocks');
app.use('/blocks', blocks);



app.get('/location/:name', function (request, response) {
    var description = blocks[request.blockName];
    if (!description) {
        response.status(404).json("Did not find " + request.params.name);
    }
    else {
        response.json(description);
    }
});

app.listen(3000, function () {
    console.log('Running Express');
});