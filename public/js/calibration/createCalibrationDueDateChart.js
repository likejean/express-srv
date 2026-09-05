let calibrationDueDateChart;
const calibrationDayDuration = 24 * 60 * 60 * 1000;
const calibrationToday = Date.now();

// Draw a persistent current-date marker inside the chart plot area.
const calibrationTodayLinePlugin = {
	id: "calibrationTodayLine",
	afterDraw: (chart) => {
		const xScale = chart.scales.x;
		const { top, bottom } = chart.chartArea;
		const xPosition = xScale.getPixelForValue(calibrationToday);

		if (xPosition < chart.chartArea.left || xPosition > chart.chartArea.right) {
			return;
		}

		const context = chart.ctx;
		const label = `Today ${moment.utc(calibrationToday).format("MM/DD/YYYY")}`;
		context.save();
		context.beginPath();
		context.setLineDash([6, 4]);
		context.lineWidth = 3;
		context.strokeStyle = "#198754";
		context.moveTo(xPosition, top);
		context.lineTo(xPosition, bottom);
		context.stroke();
		context.setLineDash([]);
		context.font = "600 12px sans-serif";
		const labelWidth = context.measureText(label).width + 12;
		const labelX = Math.max(
			chart.chartArea.left,
			Math.min(xPosition - labelWidth / 2, chart.chartArea.right - labelWidth)
		);
		const labelY = top - 28;
		context.fillStyle = "#198754";
		context.fillRect(labelX, labelY, labelWidth, 22);
		context.fillStyle = "#ffffff";
		context.fillText(label, labelX + 6, labelY + 15);
		context.restore();
	}
};

// Initialize the dual handles and apply their selected dates to the chart axis.
function setupCalibrationDateRangeControls(chartData, rangeMin, rangeMax, updateChartRange) {
	const rangeStart = document.getElementById("calibration-range-start");
	const rangeEnd = document.getElementById("calibration-range-end");
	const rangeStartLabel = document.getElementById("calibration-range-start-label");
	const rangeEndLabel = document.getElementById("calibration-range-end-label");
	if (!rangeStart || !rangeEnd || !rangeStartLabel || !rangeEndLabel) {
		return;
	}

	rangeStart.min = rangeMin;
	rangeStart.max = rangeMax;
	rangeStart.step = calibrationDayDuration;
	rangeStart.value = rangeMin;
	rangeEnd.min = rangeMin;
	rangeEnd.max = rangeMax;
	rangeEnd.step = calibrationDayDuration;
	rangeEnd.value = rangeMax;
	rangeStart.disabled = !chartData.length;
	rangeEnd.disabled = !chartData.length;

	const updateRange = () => {
		const selectedStart = Math.min(Number(rangeStart.value), Number(rangeEnd.value));
		const selectedEnd = Math.max(Number(rangeStart.value), Number(rangeEnd.value));
		rangeStartLabel.textContent = moment.utc(selectedStart).format("MM/DD/YYYY");
		rangeEndLabel.textContent = moment.utc(selectedEnd).format("MM/DD/YYYY");
		updateChartRange(selectedStart, selectedEnd + calibrationDayDuration);
	};

	rangeStart.oninput = updateRange;
	rangeEnd.oninput = updateRange;
	updateRange();
}

function createCalibrationDueDateChart(calibrations) {
	const chartCanvas = document.getElementById("calibration-due-date-chart");
	if (!chartCanvas) {
		return;
	}

	// Convert calibration records into date-axis points and preserve tooltip metadata.
	const chartData = calibrations
		.map((calibration, index) => {
			const dueDate = new Date(calibration.dueCalibrationDate).getTime();
			// Match the table status precedence: out of service, expired, extended, valid.
			const pointColor = !calibration.activeCalibration
				? "#6c757d"
				: dueDate < calibrationToday
					? "#dc3545"
					: calibration.calibrationExtended
						? "#fd7e14"
						: "#0d6efd";

			return {
				x: dueDate,
				y: index,
				calibrationName: calibration.calibrationName,
				sensorEID: calibration.sensorId?.EID || "Unknown sensor",
				sensorDescription: calibration.sensorId?.description || "Unknown description",
				pointColor,
			};
		})
		.filter((calibration) => Number.isFinite(calibration.x));
	// Align the date utilities to UTC so browser time zones do not shift labels.
	const weekDuration = 7 * calibrationDayDuration;
	const startOfWeek = (timestamp) => {
		const date = new Date(timestamp);
		date.setUTCHours(0, 0, 0, 0);
		date.setUTCDate(date.getUTCDate() - date.getUTCDay());
		return date.getTime();
	};
	const startOfDay = (timestamp) => {
		const date = new Date(timestamp);
		date.setUTCHours(0, 0, 0, 0);
		return date.getTime();
	};
	const todayWeek = startOfWeek(calibrationToday);
	const rangeMin = chartData.length
		? Math.min(...chartData.map((point) => startOfDay(point.x)))
		: todayWeek;
	const rangeMax = chartData.length
		? Math.max(...chartData.map((point) => startOfDay(point.x)))
		: todayWeek;
	// Keep one weekly division of breathing room around edge datapoints.
	const chartTimelinePadding = weekDuration;
	const chartMin = rangeMin - chartTimelinePadding;
	const chartMax = rangeMax + calibrationDayDuration + chartTimelinePadding;

	if (calibrationDueDateChart) {
		calibrationDueDateChart.destroy();
	}

	// Render the status-colored scatter plot with weekly date divisions.
	calibrationDueDateChart = new Chart(chartCanvas, {
		type: "scatter",
		plugins: [calibrationTodayLinePlugin],
		data: {
			datasets: [{
				label: "Calibration due date",
				data: chartData,
				backgroundColor: (context) => context.raw.pointColor,
				borderColor: "#000000",
				borderWidth: 1.5,
				pointRadius: 7,
				pointHoverRadius: 9,
				pointStyle: "circle",
				clip: false,
			}]
		},
		options: {
			maintainAspectRatio: false,
			layout: {
				padding: {
					top: 40,
					bottom: 12,
				}
			},
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: (context) => {
							const point = context.raw;
							return `${point.calibrationName} (${point.sensorEID} - ${point.sensorDescription}) - ${moment.utc(point.x).format("MM/DD/YYYY")}`;
						}
					}
				}
			},
			scales: {
				x: {
					type: "linear",
					min: chartMin,
					max: chartMax,
					grace: "5%",
					title: { display: true, text: "Due Date" },
					ticks: {
						callback: (value) => moment.utc(value).format("MM/DD/YYYY"),
						stepSize: weekDuration,
						maxRotation: 90,
						minRotation: 90,
					}
				},
				y: {
					display: false,
					min: -2,
					max: Math.max(chartData.length + 1, 2),
					grace: "10%",
				}
			}
		}
	});

	// Reapply the same edge padding whenever a slider handle zooms the timeline.
	setupCalibrationDateRangeControls(chartData, rangeMin, rangeMax, (selectedStart, selectedEnd) => {
		calibrationDueDateChart.options.scales.x.min = selectedStart - chartTimelinePadding;
		calibrationDueDateChart.options.scales.x.max = selectedEnd + chartTimelinePadding;
		calibrationDueDateChart.update("none");
	});
}