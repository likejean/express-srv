
console.log(_store.activeSensorCard)

function myFunction() {
	console.log("Function executed after delay!");
	console.log(_store.activeSensorCard)
	clearInterval(intervalId); // Stop the interval after execution
  }
  
  const delay = 3000; // Delay in milliseconds (e.g., 3000ms = 3 seconds)
  const intervalId = setInterval(myFunction, delay);

const config = {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [{
            label: 'Sample Data',
            data: [10, 20, 15, 25, 30, -20, 20],
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
        },
		{
            label: 'Sample Data2',
            data: [11, 12, 12, 24, 40, -2, 20],
            borderColor: 'red',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
		scales: {
			x: {
				title: {
					display: true,
					text: `Calibrator Output, [in]`
				}
			},
			y: {
				title: {
					display: true,
					text: `Abs. Error, [in]`
				}
			}
		},
    }
	
}

const previewNewChartWrapper = document.getElementById('preview-new-chart-wrapper');

const ctx = document.createElement('canvas');

new Chart(ctx.getContext('2d'), config);


previewNewChartWrapper.appendChild(ctx);
