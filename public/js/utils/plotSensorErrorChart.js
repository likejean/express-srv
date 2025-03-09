const ctx = document.getElementById('chart');
														
const output_errors = [0, 0.0043, 0.0023, 0.0053, -0.0111, 0.00309, 0.0043, 0.0351, 0.00643, -0.002, 0.0181];
const upper_bound = [0, 0.002, 0.004, 0.006, 0.008, 0.010, 0.012, 0.014, 0.016, 0.018, 0.02];
const lower_bound = [0, -0.002, -0.004, -0.006, -0.008, -0.010, -0.012, -0.014, -0.016, -0.018, -0.02];


new Chart(ctx, {
	type: 'line',
	data: {
		labels: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
		datasets:[
			{
				label: 'Upper Limit',
				pointRadius: 0,
				borderColor: 'rgba(247, 172, 172, 0.9)',
				borderWidth: 1,
				data: upper_bound
			},
			{
				label: 'Lower Limit',
				pointRadius: 0,
				borderColor: 'rgba(247, 172, 172, 0.9)',
				borderWidth: 1,
				data: lower_bound
			},
			{
				label: 'Absolute Error',
				borderColor: 'green',
				data: output_errors
			}
		]
	}
	
});