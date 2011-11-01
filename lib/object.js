/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .keys()              Get a list of keys of the object
 * .isset()             Returns true if a key is set (same as .hasOwnProperty)
 * .get()               Returns a value associated with a key or a default one if not set (default = null)
 * .set()               Sets a value to a key
 * .unset()             Deletes a key
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		Object.prototype[fun] = Extensions[fun];
	}

	// object.watch
	if (!Object.prototype.watch) {
		Object.prototype.watch = function (prop, handler) {
			var oldval = this[prop], newval = oldval,
			getter = function () {
				return newval;
			},
			setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			};
			if (delete this[prop]) { // can't watch constants
				if (Object.defineProperty) { // ECMAScript 5
					Object.defineProperty(this, prop, {
						get: getter,
						set: setter,
						enumerable: false,
						configurable: true
					});
				} else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
					Object.prototype.__defineGetter__.call(this, prop, getter);
					Object.prototype.__defineSetter__.call(this, prop, setter);
				}
			}
		};
	}

	// object.unwatch
	if (!Object.prototype.unwatch) {
		Object.prototype.unwatch = function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		};
	}
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