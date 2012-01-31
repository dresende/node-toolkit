/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .d            Assume the number is in seconds, get the days
 * .h            Assume the number is in seconds, get the hours
 * .m            Assume the number is in seconds, get the minutes
 * .s            Assume the number is in seconds, get the seconds
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		if (!Number.prototype[fun]) {
			Object.defineProperty(Number.prototype, fun, {
				"get": Extensions[fun]
			}, {
				"configurable": false,
				"enumerable": false,
				"writable": false
			});
		}
	}
};

Extensions.d = function () {
	return Math.floor((this % 604800) / 86400);
};
Extensions.h = function () {
	return Math.floor((this % 86400) / 3600);
};
Extensions.m = function () {
	return Math.floor((this % 3600) / 60);
};
Extensions.s = function () {
	return this % 60;
};