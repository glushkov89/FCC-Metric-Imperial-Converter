/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {

	//rounding function from http://www.jacklmoore.com/notes/rounding-in-javascript/
	this.round = function (value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	this.getNum = function (input) {
		var result = 0;
		var number = input.replace(/[a-z].*/i, "");
		if (number === "") return 1;
		if (number.match(/[^\/\d.]/gi)) return "invalid number";
		number = number.split("/");
		if (number.length > 2) return "invalid number";
		if (number.length === 1) {
			result = parseFloat(number[0])
		} else {
			result = (parseFloat(number[0])) / (parseFloat(number[1]));
		}
		return isNaN(result) ? 'invalid number' : this.round(result, 5);
	};

	this.getUnit = function (input) {
		var unit = input.match(/[a-z].*/i); //array of matches, or null if no matches found
		if (!unit) {
			return "invalid unit";
		} else {
			unit = unit[0].toLowerCase();
			switch (unit) {
				case "gal":
				case "l":
				case "lbs":
				case "kg":
				case "mi":
				case "km":
					return unit;
				default:
					return "invalid unit";
			}
		}
	};

	this.getReturnUnit = function (initUnit) {
		var result = "";
		switch (initUnit) {
			case "gal":
				result = "l";
				break;
			case "l":
				result = "gal";
				break;
			case "lbs":
				result = "kg";
				break;
			case "kg":
				result = "lbs";
				break;
			case "mi":
				result = "km";
				break;
			case "km":
				result = "mi";
				break;
		}
		return result;
	};

	this.spellOutUnit = function (unit) {
		var result = "";
		switch (unit) {
			case "gal":
				result = "gallon(s)";
				break;
			case "l":
				result = "liter(s)";
				break;
			case "lbs":
				result = "pound(s)";
				break;
			case "kg":
				result = "kilogram(s)";
				break;
			case "mi":
				result = "mile(s)";
				break;
			case "km":
				result = "kilometer(s)";
				break;
		}
		return result;
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		var result = 0;
		switch (initUnit) {
			case "gal":
				result = initNum * galToL;
				break;
			case "l":
				result = initNum / galToL;
				break;
			case "lbs":
				result = initNum * lbsToKg;
				break;
			case "kg":
				result = initNum / lbsToKg;
				break;
			case "mi":
				result = initNum * miToKm;
				break;
			case "km":
				result = initNum / miToKm;
				break;
		}
		return this.round(result, 5);
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
	};
}

module.exports = ConvertHandler;