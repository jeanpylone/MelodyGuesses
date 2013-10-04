var bower = require('bower'),
    path = require('path');
process.env.HOME = process.env.OPENSHIFT_DATA_DIR;
bower.commands
.install([])
.on('end', function (installed) {
    console.log(installed);
});