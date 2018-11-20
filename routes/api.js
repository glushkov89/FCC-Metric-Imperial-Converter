/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
	var convertHandler = new ConvertHandler();

	app.route("/api/convert").get(function (req, res, next) {
		var input = req.query.input;
		var initNum = convertHandler.getNum(input);
		var initUnit = convertHandler.getUnit(input);
		if (initNum === 'invalid number' && initUnit === 'invalid unit') {
			res.json({
				error: 'invalid number and unit'
			});
			return;
		}
		if (initNum === 'invalid number') {
			res.json({
				error: initNum
			});
			return;
		}
		if (initUnit === 'invalid unit') {
			res.json({
				error: initUnit
			});
			return;
		};
		var returnNum = convertHandler.convert(initNum, initUnit);
		var returnUnit = convertHandler.getReturnUnit(initUnit);
		var string = convertHandler.getString(
			initNum,
			convertHandler.spellOutUnit(initUnit),
			returnNum,
			convertHandler.spellOutUnit(returnUnit)
		);
		initUnit = initUnit === 'l' ? 'L' : initUnit;
		returnUnit = returnUnit === 'l' ? 'L' : returnUnit;
		res.json({
			initNum,
			initUnit,
			returnNum,
			returnUnit,
			string
		});

	});
};