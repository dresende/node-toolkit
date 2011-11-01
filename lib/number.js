/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .format()         Format a number defining decimal/thousand separator
 * .duration()       Format a number as being a duration time in miliseconds
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		Number.prototype[fun] = Extensions[fun];
	}
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

	while (p < w.length && s >= w[p]) {
		v = s % w[p];
		if (v > 0) parts.push(v + u[p]);

		s = Math.round(s / w[p++]);
		p++;
	}
	if (s > 0) parts.push(s + u[p]);

	return parts.reverse().join(" ");
};