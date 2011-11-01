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
 * .sum()               Returns the sum of all values in Array
 * .product()           Same as .sum() but multiplies instead of adding
 * .grep()              This is a .map() filtering items based on a regular expression
 * .max()               Returns the highest number in Array
 * .min()               Returns the lowest number in Array
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
Extensions.sum = function (base) {
	var sum = 0;
	this.map(function (val) {
		sum += parseInt(val, base || 10);
	});
	return sum;
};
Extensions.product = function (base) {
	var prod = 1;
	this.map(function (val) {
		prod *= parseInt(val, base || 10);
	});
	return prod;
};
Extensions.grep = function (re) {
	var copy = [];

	this.map(function (val) {
		if (val.match(re)) {
			copy.push(val);
		}
	});

	return copy;
};
Extensions.min = function () {
	return Math.min.apply(null, this);
};
Extensions.max = function () {
	return Math.max.apply(null, this);
};