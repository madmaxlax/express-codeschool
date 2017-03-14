var express = require('express');
var app = express();
var logger = require('./logger');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});


app.use(logger);

console.log('starting');
// app.get('/', function (request, response) {
//     response.sendFile(__dirname + '/public/index.html');
// });
app.use(express.static('public'));
var blocks = {
    'Fixed': 'Fastened in secure position',
    'Movable': 'Capable of being moved',
    'Rotating': 'moving in a circle around center'
};
app.param('name',function(request, response, next){
    var name = request.params.name;
    var lookup = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = lookup;
    next();
});
app.get('/blocks', function (request, response) {
    if (request.query.limit >= 0) {
        var count = 0;
        var ret = {};
        Object.keys(blocks).forEach(function(element) {
            count ++;
            ret[element] = blocks[element];
            if (count+"" === request.query.limit)
            {
                response.json(Object.keys(ret));
            }
        });
    }
    else {
        response.json(Object.keys(blocks));
    }
});
app.post('/blocks', parseUrlencoded, function(request,response){
    var newBlock = request.body;
    newBlockName = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
    blocks[newBlockName] = newBlock.description;
    //201 status means "Created"
    response.status(201).json(newBlockName);    
});
app.delete('/blocks/:name', function(request, response){
    delete blocks[request.blockName];
    response.sendStatus(200);
});
app.get('/blocks/:name', function (request, response) {
    // var name = request.params.name;
    // var blockLookup = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var description = blocks[request.blockName];
    if (!description) {
        response.status(404).json("Did not find "+request.params.name);
    }
    else {
        response.json(description);
    }
});


app.get('/location/:name', function (request, response) {
    var description = blocks[request.blockName];
    if (!description) {
        response.status(404).json("Did not find "+request.params.name);
    }
    else {
        response.json(description);
    }
});

app.listen(3000, function () {
    console.log('Running Express');
});