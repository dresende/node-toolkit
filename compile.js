/**
 * This is a simple way of compiling toolkit to run on the
 * client side. Please note that no tests are done using
 * browsers, only NodeJS tests.
 *
 * Warning: you need to install jsmin (npm install jsmin) on
 * this folder
 *
 * Usage:
 *
 * node compile.js > toolkit.js
 **/
var fs = require("fs"),
    jsmin = require("jsmin").jsmin,
    files = fs.readdirSync(__dirname + "/lib/"),
    i = 0, l = files.length,
    data = "";

for (; i < l; i++) {
	// ignore this files
	if ([ "index.js", "number-extra.js" ].indexOf(files[i]) != -1) continue;

	data += jsmin(String(fs.readFileSync(__dirname + "/lib/" + files[i])));
}

console.log(data);