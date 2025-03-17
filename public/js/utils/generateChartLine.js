
//This function helper generates a X-Y plot dataset array per required Chart.js format
function generateChartLine(arr_X, arr_Y) {
	
	if (arr_X.length !== arr_Y.length) {
		throw new Error("ERROR! Datasets arrays must have the same length!!!");
	}
	
	return arr_X.map((item, index) => ({ x: item, y: arr_Y[index] }));	
}