var array = require("./array"),
    date = require("./date"),
    number = require("./number"),
    string = require("./string");

module.exports.extendNative = function () {
	number.extendNative();
	string.extendNative();
	array.extendNative();
	date.extendNative();
};