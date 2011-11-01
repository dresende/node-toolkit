/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .words()          Returns the number of words found
 * .count()          Returns the number of occurrences of substring
 * .csv()            Parse a CSV line
 * .repeat()         Repeat the string a number of times
 * .reverse()        Reverse the string
 * .ord()            Get the ASCII number of a character on the string
 * .pad()            Pad a string
 * .shuffle()        Shuffles characters on a string
 * .chunk()          Splits string in chunks
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		String.prototype[fun] = Extensions[fun];
	}
};

Extensions.words = function (separators) {
	separators = "[" + (separators || "\\s\\.,\\:;\\!\\?") + "]+";

	var re = new RegExp(separators),
	    w = this.split(re),
	    p = w.indexOf("");
	while (p >= 0) {
		w.splice(p, 1);
		p = w.indexOf("");
	}

	return w;
};
Extensions.count = function (needle, offset, len) {
	var count = 0, initial_offset = offset || 0;

	len = len || this.length;
	offset = this.indexOf(needle, initial_offset);
	while (offset >= 0 && offset <= initial_offset + len) {
		count++;
		offset = this.indexOf(needle, offset + 1);
	}

	return count;
};
Extensions.csv = function (delim, enc, esc) {
	delim = delim || ",";
	enc = enc || '"';
	esc = esc || "\\";

	var cols = [], col = "",
	    in_col = false, next_delim = false,
	    end_enc, ws = [ " ", "\t" ];

	for (var i = 0, l = this.length; i < l; i++) {
		if (!in_col && ws.indexOf(this[i]) != -1) {
			continue;
		}
		if (in_col) {
			if (!end_enc && this[i] == delim) {
				cols.push(col);
				col = "";
				in_col = next_delim = false;
				continue;
			}
			if (end_enc && this[i] == enc && this[i - 1] != esc) {
				cols.push(col);
				col = "";
				in_col = !(next_delim = true);
				continue;
			}
			col += this[i];
			continue;
		}
		if (this[i] == delim) {
			if (!next_delim) {
				cols.push("");
			} else {
				next_delim = false;
			}
			continue;
		}
		if (next_delim) {
			continue;
		}
		if (this[i] == enc) {
			in_col = end_enc = true;
			continue;
		}
		if (ws.indexOf(this[i]) == -1) {
			in_col = !(end_enc = false);
			col = this[i];
		}
	}

	return cols;
};
Extensions.repeat = function (n) {
	return (new Array((n || 2) + 1)).join(this);
};
Extensions.reverse = function () {
	return this.split("").reverse().join("");
};
Extensions.ord = function (n) {
	return this.charCodeAt(n || 0);
};
Extensions.pad = function (len, pad, type) {
	var str = this;
	pad = "" + pad;
	if (pad.length == 0) pad = " ";
	switch (type) {
		case "left":
			if (str.length < len) {
				str = str.repeat(pad, Math.ceil((len - str.length) / pad.length))
				         .substr(0, len - str.length)
				    + str;
			}
			return str;
		case "center":
		case "both":
			if (str.length < len) {
				str = (str.repeat(pad, Math.ceil((len - str.length) / (2 * pad.length)))
				    + str
				    + str.repeat(pad, Math.ceil((len - str.length) / (2 * pad.length))))
				             .substr(0, len);
			}
			return str;
		default: // right
			if (str.length < len) {
				str = (str + str.repeat(pad, len - str.length)).substr(0, len);
			}
			return str;
	}
};
Extensions.shuffle = function () {
	// odd number avoids the one possibility that the string returns the same
	var str = this;
	for (var i = 0; i < 31; i++) {
		var l = 1 + Math.round(Math.random() * (str.length - 2));
		str = str.substr(l) + str.substr(0, l).reverse();
	}
	return str;
};
Extensions.chunk = function (len, end) {
	var tmp = "", str = this.valueOf();
	len = len || 76;
	end = end || "\r\n";
	while (str.length > len) {
		tmp += str.substr(0, len) + end;
		str = str.substr(len);
	}
	return tmp + str;
};