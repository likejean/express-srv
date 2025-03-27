const config = {
	type: 'line',
	data: {
		datasets: [{
				label: '<blank1>',
				data: [],
				borderColor: 'red',
				borderWidth: 2,
				fill: false
			}
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				type: 'linear',
				title: {
					display: true,
					text: '<blank>'
				}
			},
			y: {
				title: {
					display: true,
					text: '<blank>'
				}
			}
		},
		plugins: {
			title: {
				display: true,
				text: `<blank>`,
				color: 'blue',
				padding: {
					top: 5,
					bottom: 5
				},
				font: {
					size: 18,
					weight: 'bold'
				}
			},
			legend: {
				position: 'right', // or 'left', 'bottom', 'right', 'chartArea'
				align: 'middle', // or 'center', 'end'
				
			}
		}
	}
}	