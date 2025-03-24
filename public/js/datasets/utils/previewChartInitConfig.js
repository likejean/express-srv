const config = {
	type: 'line',
	data: {
		datasets: []
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
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