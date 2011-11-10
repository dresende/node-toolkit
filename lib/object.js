/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .keys()              Get a list of keys of the object
 * .isset()             Returns true if a key is set (same as .hasOwnProperty)
 * .unset()             Deletes a key
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		if (!Object.prototype[fun]) {
			Object.defineProperty(Object.prototype, fun, {
				"value": Extensions[fun],
				"configurable": false,
				"enumerable": false,
				"writable": false
			});
		}
	}
};

Extensions.watch = function (prop, handler) {
	var oldval = this[prop],
	    newval = oldval,
	    getter = function () { return newval },
	    setter = function (val) { oldval = newval; return newval = handler.call(this, prop, oldval, val) };

	if (delete this[prop]) { // can't watch constants
		Object.defineProperty(this, prop, {
			"get": getter,
			"set": setter,
			"enumerable": false,
			"configurable": true
		});
	}
};
Extensions.unwatch = function (prop) {
	var val = this[prop];
	delete this[prop]; // remove accessors
	this[prop] = val;
};
Extensions.keys = function () {
	var keys = [];

	for (k in this) {
		if (this.hasOwnProperty(k)) {
			keys.push(k);
		}
	}
	return keys;
};
Extensions.isset = function (k) {
	return this.hasOwnProperty(k);
};
Extensions.unset = function (k) {
	delete this[k];
	return this;
};