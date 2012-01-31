/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .defer()             Defer the execution of a function
 * .curry()             Curry the function with a set of parameters
 **/
(function () {
	var Extensions = {};

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

	function extendNative() {
		for (fun in Extensions) {
			if (!Function.prototype[fun]) {
				Object.defineProperty(Function.prototype, fun, {
					"value": Extensions[fun],
					"configurable": false,
					"enumerable": false,
					"writable": false
				});
			}
		}
	}

	if (typeof module != "undefined") {
		module.exports = { extendNative: extendNative };
	} else {
		extendNative();
	}
})();