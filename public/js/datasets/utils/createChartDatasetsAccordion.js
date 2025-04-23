const chartAccordionWrapper = document.getElementById('accordion-chart-datasets');


function createChartDatasetsAccordion() {
	
	let accordionHtmlItem;
	const totalQtyDatasetsPerChart = _chartfactory.chart.sensorDatasets.length;
	const chartDatasets = _chartfactory.chart.sensorDatasets;

    
	for (let i = 0; i < totalQtyDatasetsPerChart; i++) {
		// Create a new accordion item for each dataset
		// and append it to the accordion wrapper
		let datasetId = chartDatasets[i]._id;
		
		accordionHtmlItem = `<div class="accordion-item border border-2 border-success border-opacity-25 border-bottom-0 border-info my-3">
			<h2 class="accordion-header">
				<button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${i + 1}" aria-expanded="false" aria-controls="flush-collapse-${i + 1}">
					<h3>Dataset-${i + 1}: <span class="badge badge-light">PLOT#${i + 1}</span></h3>

				</button>
			</h2>
			<div id="flush-collapse-${i + 1}" class="accordion-collapse collapse" data-bs-parent="#accordionChartDatasets">
				<div class="accordion-body">
					<div class="d-flex">
						<h3 class="col-11" style="color:darkblue;">Calibration Record: ${chartDatasets[i].calibrationName}</h3>
						<span class="col-1">
							<i id="delete-dataset-${i + 1}" onclick=pullChartDatasetById(${JSON.stringify(datasetId)}) class="fa fa-2x fa-trash" style="color:red;" aria-hidden="true"></i>
						</span>
					</div>
					<hr />

					<div class="card-body text-success">
						<div class="d-flex">
							<div class="col-5 d-none d-sm-flex"><span style="font-size:x-large;">Series Label:</span></div>               
							<div id="seriesLabelWrapper${i + 1}" class="col-12 col-sm-6 mb-1 gutter text-start">
								<span class="chart-series-label-span" id="seriesLabelSpan${i + 1}">${chartDatasets[i].seriesLabel}</span>
							</div>
						</div>
					</div>

					<div class="card-body text-success">
						<div class="d-flex">
							<div class="col-5 d-none d-sm-flex"><span style="font-size:x-large;">Series Description:</span></div>               
							<div id="seriesDescriptionWrapper${i + 1}" class="col-12 col-sm-6 mb-1 gutter text-start">
								<span class="chart-series-description-span" id="seriesDescriptionSpan${i + 1}">${chartDatasets[i].seriesDescription}</span>
							</div>	
						</div>
					</div>
					
				</div>
			</div>
		</div>`;

		chartAccordionWrapper.innerHTML += accordionHtmlItem;
	}
}

