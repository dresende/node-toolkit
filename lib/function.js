/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .defer()             Defer the execution of a function
 * .curry()             Curry the function with a set of parameters
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		Function.prototype[fun] = Extensions[fun];
	}
};

Extensions.defer = function (n) {
	if (!process || n > 0) {
		setTimeout(this, n);
	} else {
		process.nextTick(this);
	}
	return this;
};
Extensions.curry = function () {
	var fun = this, args = Array.prototype.slice.apply(arguments);

	return function () {
		fun.apply(fun, args.concat(Array.prototype.slice.apply(arguments)));
	};
};