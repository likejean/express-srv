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
			}
		}
	};

}