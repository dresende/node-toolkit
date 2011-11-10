/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .pow()            Returns the number powered to an exponential
 * .odd()            Returns true if the number is odd
 * .even()           Returns true if the number is even
 * .abs()            Shortcut for Math.abs
 * .ceil()           Shortcut for Math.ceil
 * .floor()          Shortcut for Math.floor
 * .round()          Shortcut for Math.round
 * .format()         Format a number defining decimal/thousand separator
 * .duration()       Format a number as being a duration time in miliseconds
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		if (!Number.prototype[fun]) {
			Object.defineProperty(Number.prototype, fun, {
				"value": Extensions[fun],
				"configurable": false,
				"enumerable": false,
				"writable": false
			});
		}
	}
	Number.range = function () {
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
};

Extensions.pow = function (p) {
	return Math.pow(this, p);
};
Extensions.odd = function () {
	return (this.floor() % 2 != 0);
};
Extensions.even = function () {
	return (this.floor() % 2 == 0);
};
Extensions.abs = function () {
	return Math.abs(this);
};
Extensions.ceil = function () {
	return Math.ceil(this);
};
Extensions.floor = function () {
	return Math.floor(this);
};
Extensions.round = function (n) {
	return this.toFixed(n || 0);
};
Extensions.format = function (round, decimal_sep, thousand_sep) {
	var n = String(this.toFixed(round)),
	    p = n.indexOf("."),
	    s = n.substr(0, p).split("").reverse();

	for (var i = 3; i <= s.length; i+=4) {
		s.splice(i, 0, thousand_sep || ",");
	}

	return s.reverse().join("") + (decimal_sep || ".") + n.substr(p + 1);
};
Extensions.duration = function (format) {
	var positive = (this >= 0),
	    s = Math.abs(this.toFixed() / 1e3), p;

	if (typeof format != "string") {
		return duration(s);
	}

	m = format.match(/%[a-z]/i);
	while (m !== null) {
		var val = "";
		switch (m[0]) {
			case "%d":
				val = (s / 86400).toFixed();
				break;
			case "%h":
				val = (s / 3600).toFixed();
				break;
			case "%m":
				val = (s / 60).toFixed();
				break;
			case "%s":
				val = s;
				break;
			case "%r":
				val = (positive ? "" : "-");
				break;
			case "%D":
				val = String((s / 86400).toFixed()).pad(2, "0");
				break;
			case "%H":
				val = String((s / 3600).toFixed()).pad(2, "0");
				break;
			case "%M":
				val = String((s / 60).toFixed()).pad(2, "0");
				break;
			case "%S":
				val = String(s).pad(2, "0");
				break;
			case "%R":
				val = (positive ? "+" : "-");
				break;
		}

		format = (m.index > 0 ? format.substr(0, m.index) : "") + val + format.substr(m.index + 2);
		m = format.match(/%[a-z]/i);
	}

	return format;
};

function duration(s) {
	var w = [ 60, 60, 24, 7 ],
	    u = [ "s", "m", "h", "d", "w" ],
	    p = 0, v, parts = [];

	s = Math.floor(s);
	while (p < w.length && s >= w[p]) {
		v = s % w[p];
		if (v > 0) parts.push(v + u[p]);

		s = Math.floor(s / w[p++]);
		p++;
	}
	if (s > 0) parts.push(s + u[p]);

	return parts.reverse().join(" ");
};