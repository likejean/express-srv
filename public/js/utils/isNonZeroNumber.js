//this function takes a number as input and returns true if the number is not zero, not NaN, and not infinite
// and false otherwise. It is used to validate the input values for the chart datapoints.
function isNonZeroNumber(input) {
	if (typeof input !== 'number') {
		return false;
	}
	return input !== 0 && !isNaN(input) && isFinite(input);
}
