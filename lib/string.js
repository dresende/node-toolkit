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
(function () {
	var Extensions = {};

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
		if (n <= 0) return "";
		return (new Array((n || 2) + 1)).join(this || "");
	};
	Extensions.reverse = function () {
		return this.split("").reverse().join("");
	};
	Extensions.ord = function (n) {
		return this.charCodeAt(n || 0);
	};
	Extensions.trim = function (chars) {
		return this.ltrim(chars).rtrim(chars);
	};
	Extensions.ltrim = function (chars) {
		if (typeof chars == "undefined") chars = "\\s";
		var re = new RegExp("^" + chars + "+");
		return this.replace(re, '');
	};
	Extensions.rtrim = function (chars) {
		if (typeof chars == "undefined") chars = "\\s";
		var re = new RegExp(chars + "+$");
		return this.replace(re, '');
	};
	Extensions.pad = function (len, pad, type) {
		if (!len) return this;

		var str = this;
		pad = String(pad || "");
		if (pad.length == 0) pad = " ";

		switch (type) {
			case "left":
				if (str.length < len) {
					str = pad.repeat(Math.ceil((len - str.length) / pad.length))
					         .substr(0, len - str.length)
					    + str;
				}
				return str;
			case "center":
			case "both":
				if (str.length < len) {
					str = (pad.repeat(Math.ceil((len - str.length) / (2 * pad.length)))
					    + str
					    + pad.repeat(Math.ceil((len - str.length) / (2 * pad.length))))
					             .substr(0, len);
				}
				return str;
			default: // right
				if (str.length < len) {
					str = (str + pad.repeat(len - str.length)).substr(0, len);
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
	Extensions.format = function () {
		var args = [ this ].concat(Array.prototype.slice.call(arguments));

		return sprintf.apply(this, args);
	};

	function sprintf() {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Ash Searle (http://hexmen.com/blog/)
	    // + namespaced by: Michael White (http://getsprink.com)
	    // +    tweaked by: Jack
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +      input by: Paulo Freitas
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +      input by: Brett Zamir (http://brett-zamir.me)
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // *     example 1: sprintf("%01.2f", 123.1);
	    // *     returns 1: 123.10
	    // *     example 2: sprintf("[%10s]", 'monkey');
	    // *     returns 2: '[    monkey]'
	    // *     example 3: sprintf("[%'#10s]", 'monkey');
	    // *     returns 3: '[####monkey]'
	    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
	    var a = arguments,
	        i = 0,
	        format = a[i++];

		// pad()
		var pad = function (str, len, chr, leftJustify) {
			if (!chr) {
				chr = ' ';
			}
			var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
			return leftJustify ? str + padding : padding + str;
		};

		// justify()
		var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
			var diff = minWidth - value.length;
			if (diff > 0) {
				if (leftJustify || !zeroPad) {
					value = pad(value, minWidth, customPadChar, leftJustify);
				} else {
					value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
				}
			}
			return value;
		};

		// formatBaseX()
		var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
			// Note: casts negative numbers to positive ones
			var number = value >>> 0;
			prefix = prefix && number && {
				'2': '0b',
				'8': '0',
				'16': '0x'
				}[base] || '';
			value = prefix + pad(number.toString(base), precision || 0, '0', false);
			return justify(value, prefix, leftJustify, minWidth, zeroPad);
		};

		// formatString()
		var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
			if (precision != null) {
				value = value.slice(0, precision);
			}
			return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
		};

		// doFormat()
		var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
			var number;
			var prefix;
			var method;
			var textTransform;
			var value;

			if (substring == '%%') {
				return '%';
			}

			// parse flags
			var leftJustify = false,
			    positivePrefix = '',
			    zeroPad = false,
			    prefixBaseX = false,
			    customPadChar = ' ';
			var flagsl = flags.length;

			for (var j = 0; flags && j < flagsl; j++) {
				switch (flags.charAt(j)) {
					case ' ':
						positivePrefix = ' ';
						break;
					case '+':
						positivePrefix = '+';
						break;
					case '-':
						leftJustify = true;
						break;
					case "'":
						customPadChar = flags.charAt(j + 1);
						break;
					case '0':
						zeroPad = true;
						break;
					case '#':
						prefixBaseX = true;
						break;
				}
			}

			// parameters may be null, undefined, empty-string or real valued
			// we want to ignore null, undefined and empty-string values
			if (!minWidth) {
				minWidth = 0;
			} else if (minWidth == '*') {
				minWidth = +a[i++];
			} else if (minWidth.charAt(0) == '*') {
				minWidth = +a[minWidth.slice(1, -1)];
			} else {
				minWidth = +minWidth;
			}

			// Note: undocumented perl feature:
			if (minWidth < 0) {
				minWidth = -minWidth;
				leftJustify = true;
			}

			if (!isFinite(minWidth)) {
				throw new Error('sprintf: (minimum-)width must be finite');
			}

			if (!precision) {
				precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : undefined;
			} else if (precision == '*') {
				precision = +a[i++];
			} else if (precision.charAt(0) == '*') {
				precision = +a[precision.slice(1, -1)];
			} else {
				precision = +precision;
			}

			// grab value using valueIndex if required?
			value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

			switch (type) {
				case 's':
					return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
				case 'c':
					return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
				case 'b':
					return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'o':
					return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'x':
					return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'X':
					return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
				case 'u':
					return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
				case 'i':
				case 'd':
					number = (+value) | 0;
					prefix = number < 0 ? '-' : positivePrefix;
					value = prefix + pad(String(Math.abs(number)), precision, '0', false);
					return justify(value, prefix, leftJustify, minWidth, zeroPad);
				case 'e':
				case 'E':
				case 'f':
				case 'F':
				case 'g':
				case 'G':
					number = +value;
					prefix = number < 0 ? '-' : positivePrefix;
					method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
					textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
					value = prefix + Math.abs(number)[method](precision);
					return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
				default:
					return substring;
			}
		};

		return format.replace(regex, doFormat);
	}

	function extendNative() {
		for (fun in Extensions) {
			//if (!String.prototype[fun]) {
				Object.defineProperty(String.prototype, fun, {
					"value": Extensions[fun],
					"configurable": false,
					"enumerable": false,
					"writable": false
				});
			//}
		}
	};

	if (typeof module != "undefined") {
		module.exports = { extendNative: extendNative };
	} else {
		extendNative();
	}
})();