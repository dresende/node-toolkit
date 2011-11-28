require("./../lib/index").extendNative();

var vows = require("vows"),
    assert = require("assert");

vows.describe("number").addBatch({
	"The number 1234.567": {
		topic: 1234.567,
		"format(2, '\"', ' ')": function (topic) {
			assert.equal(topic.format(2, ",", " "), "1 234,57");
		},
		"round(2)": function (topic) {
			assert.equal(topic.round(2), 1234.57);
		},
		"ceil()": function (topic) {
			assert.equal(topic.ceil(), 1235);
		},
		"floor()": function (topic) {
			assert.equal(topic.floor(), 1234);
		},
		"abs()": function (topic) {
			assert.equal((-topic).abs(), topic);
		},
		"odd()": function (topic) {
			assert.ok(!topic.odd());
		},
		"even()": function (topic) {
			assert.ok(topic.even());
		},
		"pow(2)": function (topic) {
			assert.equal(topic.pow(2), 1524155.677489);
		},
		"duration": function (topic) {
			assert.equal((topic * 1e3).duration(), "20h 34s");
		}
	}
}).addBatch({
	"A range(10)": {
		topic: Number.range(10),
		"has 10 elements": function (topic) {
			assert.equal(topic.length, 10);
		},
		"it's 0..9": function (topic) {
			for (var i = 0; i < topic.length; i++)
				assert.equal(topic[i], i);
		}
	},
	"A range(5, 10)": {
		topic: Number.range(5, 10),
		"has 5 elements": function (topic) {
			assert.equal(topic.length, 6);
		},
		"it's 5..10": function (topic) {
			assert.equal(topic[0], 5);
			assert.equal(topic[1], 6);
			assert.equal(topic[2], 7);
			assert.equal(topic[3], 8);
			assert.equal(topic[4], 9);
			assert.equal(topic[5], 10);
		}
	},
	"A range(5, 10, 2)": {
		topic: Number.range(5, 10, 2),
		"has 3 elements": function (topic) {
			assert.equal(topic.length, 3);
		},
		"it's 5,7,9": function (topic) {
			assert.equal(topic[0], 5);
			assert.equal(topic[1], 7);
			assert.equal(topic[2], 9);
		}
	},
	"A range(-5, -10, -2)": {
		topic: Number.range(-5, -10, -2),
		"has 3 elements": function (topic) {
			assert.equal(topic.length, 3);
		},
		"it's -5,-7,-9": function (topic) {
			assert.equal(topic[0], -5);
			assert.equal(topic[1], -7);
			assert.equal(topic[2], -9);
		}
	}
}).export(module);