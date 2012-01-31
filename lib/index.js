var modules = [ "number", "string", "date", "math", "array", "object", "function" ];
modules.push("number-extra");

module.exports.extendNative = function () {
	for (var i = 0; i < modules.length; i++) {
		require("./" + modules[i]).extendNative();
	}
};