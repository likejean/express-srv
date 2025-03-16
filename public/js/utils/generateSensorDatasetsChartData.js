function generateSensorDatasetsChartData() {
	return {
		datasets: [
			{
				label: 'Sensor Absolute Error Outputs',
				data: [
					{x: -0.2, y: -0.00024},
					{x: -0.16, y: -0.00066},
					{x: -0.10, y: -0.00085},
					{x: -0.04, y: -0.00045},
					{x: -0.02, y: -0.00033},
					{x: 0, y: 0.00021},
					{x: 0.02, y: 0.00041},
					{x: 0.04, y: 0.0006},
					{x: 0.10, y: 0.00098},
					{x: 0.16, y: 0.0011},
					{x: 0.20, y: 0.00133},
				],
				borderColor: 'blue',
				tension: 0.5
			},
					
			{
				label: 'Upper Error Limit',
				pointRadius: 0,
				borderColor: 'rgba(247, 172, 172, 0.9)',
				borderWidth: 1,
				fill: true,
				backgroundColor: 'rgba(186, 251, 203, 0.2)',
				data: [
					{x: -0.2, y: -0.0020},
					{x: -0.16, y: -0.0016},
					{x: -0.10, y: -0.0010},
					{x: -0.04, y: -0.0004},
					{x: -0.02, y: -0.0002},
					{x: 0, y: 0.0000},
					{x: 0.02, y: 0.0002},
					{x: 0.04, y: 0.0004},
					{x: 0.10, y: 0.0010},
					{x: 0.16, y: 0.0016},
					{x: 0.20, y: 0.0020},
				],
			},
			{
				label: 'Lower Error Limit',
				pointRadius: 0,
				borderColor: 'rgba(247, 172, 172, 0.9)',
				borderWidth: 1,
				fill: true,
				backgroundColor: 'rgba(186, 251, 203, 0.2)',
				data: [
					{x: -0.2, y: 0.0020},
					{x: -0.16, y: 0.0016},
					{x: -0.10, y: 0.0010},
					{x: -0.04, y: 0.0004},
					{x: -0.02, y: 0.0002},
					{x: 0, y: 0.0000},
					{x: 0.02, y: -0.0002},
					{x: 0.04, y: -0.0004},
					{x: 0.10, y: -0.0010},
					{x: 0.16, y: -0.0016},
					{x: 0.20, y: -0.0020},
				],
			},
		]
	};
}