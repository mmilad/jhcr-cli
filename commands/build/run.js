var fs = require('fs');
exports.run = function(config) {
    var buildify = require('buildify'),
        copy = require(config.jhcrPath+'/commands/build/copy.js'),
        devDir = config.devDir;
    fs.mkdir(devDir+'/build/', function(err) {
        fs.mkdir(devDir+'/build/src/', function(err) {
            fs.mkdir(devDir+'/build/src/js', function(err) {
                var components = getFiles(devDir+'/src/components');
                buildify()
                // .load('base.js')
                .concat(components)
                // .wrap('../lib/template.js', { version: '1.0' })
                .save(devDir+'/build/src/js/output.js')
                .uglify()
                .save(devDir+'/build/src/js/output.min.js');
            });
            fs.mkdir(devDir+'/build/src/assets', function(err) {
                console.log("copy assets")
    copy.run({devDir:devDir});
            });
        });
    });
}
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