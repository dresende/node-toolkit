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
 * .multisort(...)      Sorts an Array of Objects based on keys and sort orders
 **/
(function () {
	var Extensions = {}, sorts = {};

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

		var copy = [], needles = Array.prototype.slice.apply(arguments);
		for (var i = 0; i < this.length; i++) {
			if (needles.indexOf(this[i]) == -1) {
				copy.push(this[i]);
			}
		}
		return copy;
	};
	Extensions.compact = function () {
		var copy = [];

		for (var i = 0; i < this.length; i++) {
			if (this[i] !== null && this[i] !== undefined) {
				copy.push(this[i]);
			}
		}

		return copy;
	};
	Extensions.unique = function () {
		var copy = [];

		for (var i = 0; i < this.length; i++) {
			if (copy.indexOf(this[i]) == -1) {
				copy.push(this[i]);
			}
		}

		return copy;
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
			if (String(val).match(re)) {
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
	Extensions.multisort = function () {
		var sort = Array.prototype.slice.call(arguments),
		    sorted = this;

		if (sort.length == 0) {
			throw new Error("Missing sort key");
		}
		if (sort.length % 2 > 0) {
			sort.push("asc");
		}

		for (var i = 1; i < sort.length; i += 2) {
			if (!sorts.hasOwnProperty(sort[i])) {
				throw new Error("Sort '" + sort[i] + "' not supported");
			}
		}

		for (var i = sort.length - 2; i >= 0; i -= 2) {
			for (var j = 0; j < sorted.length; j++) {
				for (var k = j + 1; k < sorted.length; k++) {
					if (sorts[sort[i + 1]](sorted[j][sort[i]], sorted[k][sort[i]])) {
						var tmp = sorted[j];
						sorted[j] = sorted[k];
						sorted[k] = tmp;
					}
				}
			}
		}
		return sorted;
	};

	function extendNative() {
		sorts["asc"] = function (a, b) {
			return [ a, b ][0] != [ a, b ].sort()[0];
		};
		sorts["lowerasc"] = function (a, b) {
			a = a.toLowerCase();
			b = b.toLowerCase();
			return [ a, b ][0] != [ a, b ].sort()[0];
		};
		sorts["desc"] = function (a, b) {
			return [ a, b ][0] == [ a, b ].sort()[0];
		};
		sorts["lowerdesc"] = function (a, b) {
			a = a.toLowerCase();
			b = b.toLowerCase();
			return [ a, b ][0] == [ a, b ].sort()[0];
		};

		for (fun in Extensions) {
			if (!Array.prototype[fun]) {
				Object.defineProperty(Array.prototype, fun, {
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