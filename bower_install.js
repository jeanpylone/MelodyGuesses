var bower = require('bower'),
    path = require('path');

bower.commands
.install([])
.on('end', function (installed) {
    console.log(installed);
});