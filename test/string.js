require("./../lib/index").extendNative();

var vows = require("vows"),
    assert = require("assert");

vows.describe("string").addBatch({
	"The string \"this is a   test\"": {
		topic: "this is a test",
		"words()": function (topic) {
			var a = topic.words();
			assert.lengthOf(a, 4);
			assert.equal(a[0], "this");
			assert.equal(a[1], "is");
			assert.equal(a[2], "a");
			assert.equal(a[3], "test");
		},
		"count('is')": function (topic) {
			assert.equal(topic.count('is'), 2);
		},
		"count('is', 5)": function (topic) {
			assert.equal(topic.count('is', 5), 1);
		},
		"count('is', 2, 2)": function (topic) {
			assert.equal(topic.count('is', 2, 2), 1);
		}
	}
}).addBatch({
	"The string \"foo\"": {
		topic: "foo",
		"repeat()": function (topic) {
			assert.equal(topic.repeat(), "foofoo");
		},
		"repeat(0)": function (topic) {
			assert.equal(topic.repeat(0), "");
		},
		"repeat(1)": function (topic) {
			assert.equal(topic.repeat(1), "foo");
		},
		"repeat(3)": function (topic) {
			assert.equal(topic.repeat(3), "foofoofoo");
		},
		"reverse()": function (topic) {
			assert.equal(topic.reverse(), "oof");
		},
		"ord()": function (topic) {
			assert.equal(topic.ord(), 102);
		},
		"ord(1)": function (topic) {
			assert.equal(topic.ord(1), 111);
		},
		"ord(2)": function (topic) {
			assert.equal(topic.ord(2), 111);
		},
		"ord(3)": function (topic) {
			assert.isNaN(topic.ord(3));
		},
		"pad(10)": function (topic) {
			assert.equal(topic.pad(10), "foo       ");
		},
		"pad(10, '=-')": function (topic) {
			assert.equal(topic.pad(10, "=-"), "foo=-=-=-=");
		},
		"pad(10, '=-', 'left')": function (topic) {
			assert.equal(topic.pad(10, "=-", "left"), "=-=-=-=foo");
		},
		"pad(10, '=-', 'both')": function (topic) {
			assert.equal(topic.pad(10, "=-", "both"), "=-=-foo=-=");
		}
	}
}).export(module);