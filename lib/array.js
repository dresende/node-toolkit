/**
 * Native
 * ------
 * .concat()
 * .indexOf()
 * .join()
 * .lastIndexOf()
 * .map()
 * .pop()
 * .push()
 * .reverse()
 * .shift()
 * .slice()
 * .sort()
 * .splice()
 * .split()
 * .unshift()
 *
 * Extension
 * ---------
 * .first([n])          First element of Array or null
 * .last([n])           Last element of Array or null
 * .without(...)        Removes element(s) of Array
 * .compact()           Removes null/undefined from Array
 * .unique()            Removes duplicates from Array
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		Array.prototype[fun] = Extensions[fun];
	}
};

Extensions.first = function (n) {
	if (!this.length) return null;

	if (n && n > 1) return this.slice(0, n);
	return this[0];
};
Extensions.last = function (n) {
	if (!this.length) return null;

	if (n && n > 1) return this.slice(-n);
	return this[this.length - 1];
};
Extensions.without = function () {
	if (!this.length || !arguments.length) {
		return this;
	}

	for (var i = 0; i < arguments.length; i++) {
		var p = this.indexOf(arguments[i]);
		if (p >= 0) {
			this.splice(p, 1);
		}
	}

	return this;
};
Extensions.compact = function () {
	var p = this.indexOf(null);

	while (p >= 0) {
		this.splice(p, 1);
		p = this.indexOf(null);
	}
	p = this.indexOf(undefined);

	while (p >= 0) {
		this.splice(p, 1);
		p = this.indexOf(undefined);
	}

	return this;
};
Extensions.unique = function () {
	for (var i = 0; i < this.length; i++) {
		var p = this.indexOf(this[i], i + 1);

		while (p >= 0) {
			this.splice(p, 1);
			p = this.indexOf(this[i], i + 1);
		}
	}

	return this;
};
Extensions.range = function () {
	if (arguments.length == 0) {
		return [];
	}
	var start = arguments.length > 1 ? arguments[0] : 0,
	    end = arguments.length < 2 ? arguments[0] : arguments[1],
	    step = arguments.length > 2 ? arguments[2] : 1,
	    range = [];

	if (start > end) {
		for (var i = start; i > end; i += step) {
			range.push(i);
		}
	} else {
		for (var i = start; i < end; i += step) {
			range.push(i);
		}
	}

	return range;
};