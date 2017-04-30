var fs = require('fs');
exports.run = function(config) {
    var merge = require(config.jhcrPath+'/commands/build/merge.js'),
        copy = require(config.jhcrPath+'/commands/build/copy.js'),
        devDir = config.devDir;
    fs.mkdir('./build/', function(err) {
        var components = getFiles(devDir+'/src/components');
        merge.run({targets: components, dest:'./build/src/build.js'});
        fs.mkdir('./build/src/', function(err) {
            copy.run({from: "./dev/src/assets", to: './build/src'})
        });
    });

    function getFiles (dir, files_) {
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        for (var i in files){
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }
}