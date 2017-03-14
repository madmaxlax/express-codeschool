var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened in secure position',
    'Movable': 'Capable of being moved',
    'Rotating': 'moving in a circle around center'
};
router.route('/')
    .get(function (request, response) {
        if (request.query.limit >= 0) {
            var count = 0;
            var ret = {};
            Object.keys(blocks).forEach(function (element) {
                count++;
                ret[element] = blocks[element];
                if (count + "" === request.query.limit) {
                    response.json(Object.keys(ret));
                }
            });
        }
        else {
            response.json(Object.keys(blocks));
        }
    })
    .post(parseUrlencoded, function (request, response) {
        var newBlock = request.body;
        newBlockName = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
        blocks[newBlockName] = newBlock.description;
        //201 status means "Created"
        response.status(201).json(newBlockName);
    });

router.route('/:name')
    .all(function (request, response, next) {
        var name = request.params.name;
        var lookup = name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.blockName = lookup;
        next();
    })
    .get(function (request, response) {
        // var name = request.params.name;
        // var blockLookup = name[0].toUpperCase() + name.slice(1).toLowerCase();
        var description = blocks[request.blockName];
        if (!description) {
            response.status(404).json("Did not find " + request.params.name);
        }
        else {
            response.json(description);
        }
    }).delete(function (request, response) {
        delete blocks[request.blockName];
        response.sendStatus(200);
    });
module.exports = router;
