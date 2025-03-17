function getSensorDatasetsChartConfig(data) {
	return {
		type: 'line',
		data,
		options: {
			scales: {
				x: {
					type: 'linear',
					title: {
						display: true,
						text: 'Calibrator Output, [in]'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Sensor Absolute Error, [in]'
					}
				}
			},
			plugins: {
				title: {
					display: true,
					text: 'Sensor Linearity and Hysteresis Performance',
					color: 'blue',
					padding: {
						top: 10,
						bottom: 10
					},
					font: {
						size: 25,
						weight: 'bold'
					}
				},
				legend: {
					position: 'right', // or 'left', 'bottom', 'right', 'chartArea'
					align: 'middle', // or 'center', 'end'
					
				}
			}
		}
	};

}