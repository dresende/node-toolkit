require("./../lib/index").extendNative();

var vows = require("vows"),
    assert = require("assert");

vows.describe("math").addBatch({
	"With Math": {
		topic: Math,
		".random()": function (topic) {
			for (var i = 0; i < 100; i++) {
				assert.isTrue(topic.random() >= 0);
				assert.isTrue(topic.random() <= 1);
			}
		},
		".random(1, 5)": function (topic) {
			var min = 1, max = 5;

			for (var i = 0; i < 100; i++) {
				assert.isTrue(topic.random(min, max) >= min);
				assert.isTrue(topic.random(min, max) <= max);
			}
		}
	}
}).export(module);