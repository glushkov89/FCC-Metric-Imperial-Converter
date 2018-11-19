/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
	this.getNum = function (input) {
		var result = 0;
		var number = input.replace(/[a-z].*/i, "");
		if (number === "") return 1;
		if (number.match(/[^\/\d.]/gi)) return "invalid number";
		number = number.split("/");
		if (number.length > 2) return "invalid number";
		if (number.length === 1) {
			return parseFloat(number[0]);
		} else {
			result = (parseFloat(number[0])) / (parseFloat(number[1]));
			return isNaN(result) ? 'invalid number' : result;
		}
	};

	this.getUnit = function (input) {
		var result = "";
		var unit = input.match(/[a-z].*/i);
		if (!unit || unit.length > 1) {
			result = "invalid unit";
		} else {
			unit = unit[0].toLowerCase();
			switch (unit) {
				case "gal":
				case "l":
				case "lbs":
				case "kg":
				case "mi":
				case "km":
					result = unit;
					break;
				default:
					result = "invalid unit";
					break;
			}
		}
		return result;
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
				result = initNum / miToKm;
				break;
			case "km":
				result = initNum * miToKm;
				break;
		}
		return result;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
	};
}

module.exports = ConvertHandler;