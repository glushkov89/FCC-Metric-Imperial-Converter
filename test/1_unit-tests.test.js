/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
	suite("Function convertHandler.getNum(input)", function () {
		test("Whole number input", function (done) {
			var input = "32L";
			var result = convertHandler.getNum(input);
			assert.equal(result, 32);
			done();
		});

		test("Decimal Input", function (done) {
			var input = "32.69kg";
			assert.equal(convertHandler.getNum(input), 32.69);
			done();
		});

		test("Fractional Input", function (done) {
			var input = "1/16in";
			assert.equal(convertHandler.getNum(input), 0.0625);
			done();
		});

		test("Fractional Input w/ Decimal", function (done) {
			var input = "5.4/3lbs";
			assert.equal(convertHandler.getNum(input), 1.8);
			done();
		});

		test("Invalid Input (double fraction)", function (done) {
			var input = "5/3/16km";
			assert.equal(convertHandler.getNum(input), "invalid number");
			done();
		});

		test("No Numerical Input", function (done) {
			var input = "gal";
			assert.equal(convertHandler.getNum(input), 1);
			done();
		});
	});

	suite("Function convertHandler.getUnit(input)", function () {
		test("For Each Valid Unit Inputs", function (done) {
			var input = [
				"34gal",
				"1/2l",
				"3/16mi",
				"356.4km",
				"2/12lbs",
				"1kg",
				"2GAL",
				"1L",
				"1/16MI",
				"3.175KM",
				"76.25LBS",
				"9KG"
			];
			var expect = [
				"gal",
				"l",
				"mi",
				"km",
				"lbs",
				"kg",
				"gal",
				"l",
				"mi",
				"km",
				"lbs",
				"kg"
			];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.getUnit(ele), expect[i]);
			});
			done();
		});

		test("Unknown Unit Input", function (done) {
			var input = ["", "ton", "sdvdsvs", "kg_", "kg to lb"];
			input.forEach(function (ele) {
				assert.equal(convertHandler.getUnit(ele), "invalid unit");
			});
			done();
		});
	});

	suite("Function convertHandler.getReturnUnit(initUnit)", function () {
		test("For Each Valid Unit Inputs", function (done) {
			var input = ["gal", "l", "mi", "km", "lbs", "kg"];
			var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});
	});

	suite("Function convertHandler.spellOutUnit(unit)", function () {
		test("For Each Valid Unit Inputs", function (done) {
			var input = ["gal", "l", "mi", "km", "lbs", "kg"];
			var expect = [
				"gallon(s)",
				"liter(s)",
				"mile(s)",
				"kilometer(s)",
				"pound(s)",
				"kilogram(s)"
			];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
			});
			done();
		});
	});

	suite("Function convertHandler.convert(num, unit)", function () {
		test("Gal to L", function (done) {
			var input = [5, "gal"];
			var expected = 18.9271;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		test("L to Gal", function (done) {
			var input = [5, "l"];
			var expected = 1.32086;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		test("Mi to Km", function (done) {
			var input = [1 / 16, "mi"];
			var expected = 0.10058;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		test("Km to Mi", function (done) {
			var input = [2.45, "km"];
			var expected = 3.94288;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		test("Lbs to Kg", function (done) {
			var input = [0.25, "lbs"];
			var expected = 0.11339;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		test("Kg to Lbs", function (done) {
			var input = [30.25 / 20, "kg"];
			var expected = 3.33449;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});
	});
});