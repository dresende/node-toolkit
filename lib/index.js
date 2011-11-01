var modules = [ "number", "string", "date", "math", "array", /*"object", */"function" ];

module.exports.extendNative = function () {
	for (var i = 0; i < modules.length; i++) {
		require("./" + modules[i]).extendNative();
	}
};