require("./../lib/index").extendNative();

var vows = require("vows"),
    assert = require("assert");

vows.describe("array").addBatch({
	"The array [1,2,3,4,5]": {
		topic: [1,2,3,4,5],
		"first()": function (topic) {
			assert.equal(topic.first(), 1);
		},
		"last()": function (topic) {
			assert.equal(topic.last(), 5);
		},
		"without()": function (topic) {
			var a = topic.without();
			assert.lengthOf(a, 5);
			assert.equal(a[0], 1);
			assert.equal(a[1], 2);
			assert.equal(a[2], 3);
			assert.equal(a[3], 4);
			assert.equal(a[4], 5);
		},
		"without(3)": function (topic) {
			var a = topic.without(3);
			assert.lengthOf(a, 4);
			assert.equal(a[0], 1);
			assert.equal(a[1], 2);
			assert.equal(a[2], 4);
			assert.equal(a[3], 5);
		},
		"without(3, 2)": function (topic) {
			var a = topic.without(3, 2);
			assert.lengthOf(a, 3);
			assert.equal(a[0], 1);
			assert.equal(a[1], 4);
			assert.equal(a[2], 5);
		},
		"sum()": function (topic) {
			assert.equal(topic.sum(), 15);
		},
		"product()": function (topic) {
			assert.equal(topic.product(), 120);
		},
		"min()": function (topic) {
			assert.equal(topic.min(), 1);
		},
		"max()": function (topic) {
			assert.equal(topic.max(), 5);
		},
		"grep(/[23]/)": function (topic) {
			var a = topic.grep(/[23]/);
			assert.lengthOf(a, 2);
			assert.equal(a[0], 2);
			assert.equal(a[1], 3);
		}
	}
}).addBatch({
	"The array [1,2,null,3,,2,1,undefined]": {
		topic: [1,2,null,3,,2,1,undefined],
		"compact()": function (topic) {
			var a = topic.compact();
			assert.lengthOf(a, 5);
			assert.equal(a[0], 1);
			assert.equal(a[1], 2);
			assert.equal(a[2], 3);
			assert.equal(a[3], 2);
			assert.equal(a[4], 1);
		},
		"unique()": function (topic) {
			var a = topic.unique();
			assert.lengthOf(a, 5);
			assert.equal(a[0], 1);
			assert.equal(a[1], 2);
			assert.equal(a[2], null);
			assert.equal(a[3], 3);
			assert.equal(a[4], undefined);
		},
		"compact().unique()": function (topic) {
			var a = topic.compact().unique();
			assert.lengthOf(a, 3);
			assert.equal(a[0], 1);
			assert.equal(a[1], 2);
			assert.equal(a[2], 3);
		}
	}
}).export(module);