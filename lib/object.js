/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .keys()              Get a list of keys of the object
 * .isset()             Returns true if a key is set (same as .hasOwnProperty)
 * .unset()             Deletes a key
 * .watch()             Watch a key value change
 * .unwatch()           Unwatch a key value change
 * .clone()             Get a new copy of the object and return
 * .extend()            Adds every extended key to object (not a new copy!)
 **/
(function () {
	var Extensions = {};

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
	Extensions.isset = function (k) {
		return this.hasOwnProperty(k);
	};
	Extensions.unset = function (k) {
		delete this[k];
		return this;
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
	Extensions.each = function (cb) {
		var keys = Extensions.keys.apply(this);

		for (var i = 0; i < keys.length; i++) {
			cb.call(this, this[keys[i]], keys[i], this);
		}
		return this;
	};
	Extensions.clone = function () {
	  return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyNames(this).reduce(function(memo, name) {
	     return (memo[name] = Object.getOwnPropertyDescriptor(this, name)) && memo;
	  }, {}));
	};
	Extensions.extend = function (obj) {
		if (!obj) return this;

		for (k in obj) {
			this[k] = obj[k];
		}

		return this;
	};

	function extendNative() {
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

	if (typeof module != "undefined") {
		module.exports = { extendNative: extendNative };
	} else {
		extendNative();
	}
})();