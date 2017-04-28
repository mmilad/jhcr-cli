
var exec = require('child_process').exec;
exports.run = function (config) {
    devDir = config.devDir;
        exec('reload --dir src -b 4000');
}