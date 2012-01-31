/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .random()          Same as original but you can set 2 parameters defining min and max integer numbers
 **/
(function () {
	var Extensions = {};

	function extendNative() {
		for (fun in Extensions) {
			if (!Math.prototype[fun]) {
				Object.defineProperty(Math.prototype, fun, {
					"value": Extensions[fun],
					"configurable": false,
					"enumerable": false,
					"writable": false
				});
			}
		}

		var rand = Math.random;

		Math.random = function (min, max) {
			min = min || 0;
			max = max || 1;

			return min + (rand() * (max - min));
		};
	};

	if (typeof module != "undefined") {
		module.exports = { extendNative: extendNative };
	} else {
		extendNative();
	}
})();