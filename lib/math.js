/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .random()          Same as original but you can set 2 parameters defining min and max integer numbers
 **/
var Extensions = {};

module.exports.extendNative = function () {
	for (fun in Extensions) {
		Math.prototype[fun] = Extensions[fun];
	}

	var rand = Math.random;

	Math.random = function (min, max) {
		min = min || 0;
		max = max || 1;

		return min + (rand() * (max - min));
	};
};