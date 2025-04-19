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

						// fixes the tooltip to show the correct value for the point
						// and not the value of the last point in the dataset
						footer: context => {
							console.log("y",Math.abs(context[0].parsed.y))
							console.log("x:",Math.abs(context[0].parsed.x));
							console.log("errorLimit:",Number(errorLimit));
							return Math.abs(context[0].parsed.y) > Math.abs(context[0].parsed.x) * Number(errorLimit) / 100 ? "out-of-tolerance" : null;
						},
						// Gets the image to be used as a point style in the legend
						// and the tooltip. The image is loaded asynchronously.
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