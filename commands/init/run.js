var fs = require('fs');
exports.run = function(config) {
    devDir = config.devDir;
    fs.mkdir(devDir, function (err) {
        fs.mkdir(devDir+'/src', function (err) {
            fs.readFile(config.jhcrPath+'node_modules/jhcr/dist/jhcr.js', 'utf8', function(err, data) {
                if (err) throw err;
                fs.writeFile(config.devDir+'/jhcr.js', data);
            });
            fs.writeFile(devDir+'/build.html', INDEX);
            fs.mkdir(devDir+'/src/assets', function (err) {
                console.log("assets created")
            });
            fs.mkdir(devDir+'/src/js', function (err) {
                console.log("js created")
            });
            fs.mkdir('src/css', function (err) {
                console.log("css created")
            });
            fs.mkdir(devDir+'/src/components', function(err) {
                fs.mkdir(devDir+'/src/components/main', function(err) {
                    fs.writeFile(devDir+'/src/components/main/H.js', BASIC_COMPONENT);
                    fs.writeFile(devDir+'/src/components/main/C.js', BASIC_STYLE);
                });
            });
        });
    });
    console.log("initializing")
    // init end
}

var INDEX = 
`<html>
    <head>
        <script src="./src/build.js"></script>
    </head>
    <body><main></main></body>
</html>`;

var BASIC_COMPONENT = `
/*registering main-tag behavior*/
J.registry["main"] = {
    onSet: function (elem) {
        elem.innerHTML = "Hello World!";
    }
};`;
var BASIC_STYLE = `
/*registering main-tag style*/
J.C({
    main: {
        border: "1px solid black",
        "border-radius": "5px",
        "background-color": "#f1f1f1",
        children: {
            ".foo": {
                padding: "20px",
                children: {
                    p: {
                        "font-weight": "bold",
                        "font-size": "24px",
                        color: "green"
                    }
                }
            }
        }
    }
});`;