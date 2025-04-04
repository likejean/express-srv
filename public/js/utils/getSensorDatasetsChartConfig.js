//chart data and options is processed and structured into a format suitable for rendering.

function getSensorDatasetsChartConfig(data, options) {

	return {
		type: 'line',
		data,
		options: {
			responsive: true,
			scales: {
				x: {
					type: 'linear',
					title: {
						display: true,
						text: options.chartXLabel
					}
				},
				y: {
					title: {
						display: true,
						text: options.chartYLabel
					}
				}
			},
			plugins: {
				tooltip: {
					callbacks: {
						label: context => `{x: ${context.raw.x}, y: ${context.raw.y}}`,
						title: () => ""
					}
				},
				title: {
					display: true,
					text: `${options.chartTitle}`,
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