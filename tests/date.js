require("./../lib/index").extendNative();

var vows = require("vows"),
    assert = require("assert");

vows.describe("date").addBatch({
	"new Date()": {
		topic: function () { return new Date(); },
		"addHour()": function (topic) {
			assert.equal(topic.addHour().getTime(), topic.getTime() + 3600e3);
		},
		"addHour(2)": function (topic) {
			assert.equal(topic.addHour(2).getTime(), topic.getTime() + 7200e3);
		},
		"addHour(-1)": function (topic) {
			assert.equal(topic.addHour(-1).getTime(), topic.getTime() - 3600e3);
		},
		"addDay()": function (topic) {
			assert.equal(topic.addDay().getTime(), topic.getTime() + 86400e3);
		},
		"addDay(2)": function (topic) {
			assert.equal(topic.addDay(2).getTime(), topic.getTime() + 172800e3);
		},
		"addDay(-1)": function (topic) {
			assert.equal(topic.addDay(-1).getTime(), topic.getTime() - 86400e3);
		},
		"addWeek()": function (topic) {
			assert.equal(topic.addWeek().getTime(), topic.getTime() + 604800e3);
		},
		"addWeek(2)": function (topic) {
			assert.equal(topic.addWeek(2).getTime(), topic.getTime() + 1209600e3);
		},
		"addWeek(-1)": function (topic) {
			assert.equal(topic.addWeek(-1).getTime(), topic.getTime() - 604800e3);
		},
		"before()": function (topic) {
			assert.isTrue(topic.before((new Date()).addHour()));
		},
		"after()": function (topic) {
			assert.isTrue(topic.after((new Date()).addHour(-1)));
		},
		"between()": function (topic) {
			assert.isTrue(topic.between((new Date()).addHour(-1), (new Date()).addHour()));
		}
	}
}).export(module);