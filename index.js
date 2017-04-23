#! /usr/bin/env node
var exec = require('child_process').exec;
var userArgs = process.argv.slice(2);
var fs = require('fs');
var pref="test/";
// on init
if(userArgs.length ===1 ){
    if(userArgs[0] === "init") {
        exec('npm install git://github.com/mmilad/jhcr --save');
    }
    fs.mkdir('src', function (err){
        // if (err) return console.log("already initialzied");
        fs.mkdir('src/assets');
        fs.mkdir('src/js');
        fs.mkdir('src/css');
    });
    console.log("initializing")
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