var fs = require('fs');
exports.run = function(config) {
    devDir = config.devDir;
    var exec = require('child_process').exec;
    if (!fs.existsSync(devDir+'node_modules/jhcr/dist/jhcr.js')) {
        exec('npm install jhcr --save');
    }
    // exec('npm init');
    fs.mkdir(devDir, function (err) {
        fs.mkdir(devDir+'/src', function (err) {
            fs.writeFile(devDir+'/src/index.html', INDEX);
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
                    fs.writeFile(devDir+'/src/components/main/H.js', `
// registering main-tag behavior
J.registry.main = {
    onSet: function (elem) {
        elem.innerHTML = "Hello World!";
        elem.data.set = "inputVal";
        elem.data.set = "selectValue";
        elem.data.set = "selectHtml";
        var JHelement = {
            tag: "div",
            attributes: {class: "foo"},
            children: [
                {
                    tag: "input",
                    callbacks: [{
                        event: "keyup",
                        callback: function () {
                            elem.data.inputVal = this.value;
                        }
                    }]
                },
                {
                    tag: "p",
                    bind: {
                        data: elem.data.inputVal,
                        property: "innerHTML",
                        attribute: "value"
                    }
                },
                {
                    tag: "select",
                    callbacks: [{
                        event: "change",
                        callback: function () {
                            elem.data.selectValue = this.value;
                        }
                    }],
                    children: [
                        {
                            tag: "option",
                            html: "Otion 1",
                            value: "value of option 1"
                        },
                        {
                            tag: "option",
                            html: "Otion 2",
                            value: "value of option 2"
                        },
                        {
                            tag: "option",
                            html: "Otion 3",
                            value: "value of option 3"
                        }
                    ]
                },
                {
                    tag: "p",
                    bind : {
                        data: elem.data.selectValue,
                        property: "innerHTML"
                    }
                }
            ]
        };
        elem.data.selectValue.onSet.push(function(e) {
            console.log(e)
        });
        J.H(JHelement); // adding element property
        elem.appendChild(JHelement.element);
    }
};
                `);
                fs.writeFile(devDir+'/src/components/main/C.js', `
// registering main-tag style
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
});
                    `);
    //                 fs.writeFile('src/components/main/R.js', `
    // // registering main-tag 
    // J.registry.main = {
    //     onSet: function (elem) {
    //         elem.innerHTML = "Hello World!";
    //     }
    // }
    //                 `);
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
        <script src="./../node_modules/jhcr/dist/jhcr.js"></script>
        <script src="./src/components/main/H.js"></script>
        <script src="./src/components/main/C.js"></script>
    </head>
    <body><main></main></body>
</html>`;