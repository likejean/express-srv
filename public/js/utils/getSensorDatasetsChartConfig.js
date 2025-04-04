//chart data and options is processed and structured into a format suitable for rendering.

const image = new Image(15, 15);
image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQ4gEz0fLmF0a8tfFHFi8ReXsh6FZFXdpss_TawmpXAUSg5yWJVpaGMtbh_VJcN92fXE&usqp=CAU";


function getSensorDatasetsChartConfig(data, options, errorLimit) {

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
					usePointStyle: true,
					backgroundColor: 'rgb(0, 0, 0, 1)',
					padding: 8,
					callbacks: {						
						label: context => ` - {x: ${context.raw.x}, y: ${context.raw.y}}`,
						title: () => "",
						footer: context => {
							return Math.abs(context[0].parsed.y) > Math.abs(context[0].parsed.x) * Number(errorLimit) / 100 ? "out-of-tolerance" : null;
						},
						labelPointStyle: context => {
							return {
								pointStyle: image
							}
						}
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