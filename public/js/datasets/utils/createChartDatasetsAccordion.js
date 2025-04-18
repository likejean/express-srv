const chartAccordionWrapper = document.getElementById('accordion-chart-datasets');


function createChartDatasetsAccordion() {

	let accordionHtmlItem;
	const totalQtyDatasetsPerChart = _chartfactory.dataset.sensorDatasets.length;
	const chartDatasets = _chartfactory.dataset.sensorDatasets;


	for (let i = 0; i < totalQtyDatasetsPerChart; i++) {		
		accordionHtmlItem = `<div class="accordion-item border border-2 border-success border-opacity-25 border-bottom-0 border-info my-3">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${i + 1}" aria-expanded="false" aria-controls="flush-collapse-${i + 1}">
					<h3>Dataset-${i + 1}: <span class="badge badge-light">PLOT#${i + 1}</span></h3>

				</button>
			</h2>
			<div id="flush-collapse-${i + 1}" class="accordion-collapse collapse" data-bs-parent="#accordionChartDatasets">
				<div class="accordion-body">
					<h3>Calibration Name: ${chartDatasets[i].calibrationName}</h3>
					<p>${chartDatasets[i].seriesLabel}</p>					
					<p>${chartDatasets[i].seriesDescription}</p>
				</div>
			</div>
		</div>`;
			
		chartAccordionWrapper.innerHTML += accordionHtmlItem;
	}
}

