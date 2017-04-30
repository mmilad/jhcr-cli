#! /usr/bin/env node
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var jhcrPath = process.argv[1].replace('index.js','').replace(/\\/g,'/');;
var cliPath = path.dirname(fs.realpathSync(__filename));
var userArgs = process.argv.slice(2);
var devDir = "dev";
// on init
// console.log("jhcr path: ", jhcrPath)
// console.log("cliPath path: ", cliPath)
// console.log("devDir path: ", devDir)
if(userArgs.length ===1 ) {
    if (fs.existsSync(jhcrPath+'commands/'+userArgs[0]+'/run.js')) {
        var init = require(jhcrPath+'commands/'+userArgs[0]+'/run.js');
        init.run({
            jhcrPath: jhcrPath,
            devDir:devDir,
            cliPath: cliPath
        });
    } else {
        console.log("command not found")
    }
} else {
// create start 
if((userArgs[0] === "n") || (userArgs[0] === "new")) {
    if((userArgs[1] === "c") || (userArgs[1] === "component")) {
        if(userArgs[2]) {
            fs.mkdir(devDir+'/src/components/'+userArgs[2], function(err) {
                fs.writeFile(devDir+'/src/components/'+userArgs[2]+'/component.js', `
J.registry["`+userArgs[2]+`"] = {
    onSet = function (elem) {
        elem.innerHTML = "Hello World!";
    }
};
                `);
                fs.writeFile(devDir+'/src/components/'+userArgs[2]+'/style.js', `
J.C({"`+userArgs[2]+`": {}});
                `);
            });
        }
    }
}

}





// // on read file
// if(userArgs[0] === "rf") {
//     if(!userArgs[1]) {
//         console.error("please enter read name")
//         return
//     }
//     fs.readFile(userArgs[1], 'utf8', function (err,data) {
//         if (err) {
//             return console.log(err);
//         }
//         data = JSON.parse(data);
//         console.log(data);
//     });
// }
// // on read path
// if(userArgs[0] === "rd") {
//     if(!userArgs[1]) {
//         console.error("please enter read name")
//         return
//     }
//     p= userArgs[1];
//     fs.readdir(p, function (err, files) {
//         if (err) {
//             throw err;
//         }
//         console.log(files)

//         // files.map(function (file) {
//         //     return path.join(p, file);
//         // }).filter(function (file) {
//         //     return fs.statSync(file).isFile();
//         // }).forEach(function (file) {
//         //     console.log("%s (%s)", file, path.extname(file));
//         // });
//     });
// }




// function readFile() {

// }
// var jsonStr = {
//     tag: "html",
//     attributes: {
//         src:"foo",
//         href: "me"
//     },
//     children: [
//         {
//             tag: "head",
//             children: [
//                 {
//                     tag: "script",
//                     attributes: {
//                         src: "./../node_modules/jhcr/dist/jhcr.js"
//                     }
//                 }
//             ]
//         },
//         {
//             tag: "body"
//         }
//     ]
// }

// var tl=0;
// function jsonToHtmlString(config) {
//     var l,
//         txt="",
//         attrList="",
//         content="",
//         tabs="";
//     tabs = JSON.parse(getTabs(tl))
//     tl++;
//     txt = tabs+"<"+config.tag;
//     for(l in config.attributes) {
//         attrList = attrList +' '+l+'="'+config.attributes[l]+'"'
//     }
//     console.log(attrList)
//     for(l in config.children) {
//         content = content + jsonToHtmlString(config.children[l])
//     };
//     txt = txt + attrList +'>\n'+tabs+content+'\n'+tabs+'</'+config.tag+'>\n';
//     tl--;
//     return txt;
// }
// var ee = jsonToHtmlString(jsonStr);
// function getTabs(amount){
//     var txt="", i;
//     for(i=0; i<amount; i++) {
//         txt = txt +"\t";
//     }
//     txt = JSON.stringify(txt);
//     return txt;
// }
// var dd = getTabs(3)
// console.log(ee);
// console.log(dd);