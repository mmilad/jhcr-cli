var fs = require('fs');
exports.run = function (config) {
    var tpl = "",
        head ="",
        scripts ="";
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
    var components = getFiles(config.devDir+''),
        script;
    components.forEach(function(i) {
        if(i.substr(i.length - 3) === ".js") {
            script = i.replace(config.devDir+"/", "");
            scripts+='\n\t\t<script type="text/javascript" src="./'+script+'"></script>';
        }
    });
    var initialized = '<html>\n\t<head>'+scripts+'\n\t</head>\n\t<body>\n\t\t<main></main>\n\t</body>\n</html>';
    return initialized;
};
