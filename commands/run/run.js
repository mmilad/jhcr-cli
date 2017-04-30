var fs = require('fs'),
    bs = require('browser-sync').create(),
    testIndex = "";
exports.run = function (config) {
    testIndex = require(config.jhcrPath+'/commands/run/initializer.js').run(config)
    fs.writeFile(config.devDir+'/index.html', testIndex, function(e) {
        if(e) {
            console.log(e)
        }
        bs.init({
            server: config.devDir+'/'
        });
        bs.watch(config.devDir+'/').on("change", function(changedFile){
                console.log(changedFile)
            fs.writeFile(config.devDir+'/index.html', testIndex, function(err) {
                if(err) {
                    console.log(err)
                }
                bs.reload()
            });
        });
    });
}