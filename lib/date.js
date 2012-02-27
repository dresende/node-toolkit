/**
 * Native
 * ------
 *
 * Extension
 * ---------
 * .addMinute()      Add one or more minutes to the Date
 * .addHour()        Add one or more hours to the Date
 * .addDay()         Add one or more days to the Date
 * .addWeek()        Add one or more weeks to the Date
 * .addMonth()       Add one or more months to the Date
 * .addYear()        Add one or more years to the Date
 * .before()         Date is before a Date
 * .after()          Date is after a Date
 * .between()        Date is between 2 Dates
 * .diff()           Returns the difference from 2 Dates
 **/
(function () {
	var Extensions = {};

	Extensions.addMinute = function (n) {
		var dt = new Date();
		dt.setTime(this.getTime() + (60e3 * (n || 1)));

		return dt;
	};
	Extensions.addHour = function (n) {
		var dt = new Date();
		dt.setTime(this.getTime() + (3600e3 * (n || 1)));

		return dt;
	};
	Extensions.addDay = function (n) {
		var dt = new Date();
		dt.setTime(this.getTime() + (86400e3 * (n || 1)));

		return dt;
	};
	Extensions.addWeek = function (n) {
		var dt = new Date();
		dt.setTime(this.getTime() + (604800e3 * (n || 1)));

		return dt;
	};
	Extensions.addMonth = function (n) {
		var dt = new Date();
		dt.setMonth(this.getMonth() + (n || 1));

		return dt;
	};
	Extensions.addYear = function (n) {
		var dt = new Date();
		dt.setFullYear(this.getFullYear() + (n || 1));

		return dt;
	};
	Extensions.before = function (dt) {
		return this < dt;
	};
	Extensions.after = function (dt) {
		return this > dt;
	};
	Extensions.between = function (start, end) {
		return !this.before(start) && !this.after(end);
	};
	Extensions.diff = function (dt) {
		return this.getTime() - dt.getTime();
	};

	function extendNative() {
		for (fun in Extensions) {
			if (!Date.prototype[fun]) {
				Object.defineProperty(Date.prototype, fun, {
					"value": Extensions[fun],
					"configurable": false,
					"enumerable": false,
					"writable": false
				});
			}
		}
	};

	if (typeof module != "undefined") {
		module.exports = { extendNative: extendNative };
	} else {
		extendNative();
	}
})();