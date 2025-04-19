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


					<div class="card-body text-success">
						<div class="d-flex">
							<div class="col-5 d-none d-sm-flex"><span style="font-size:x-large;">Series Label:</span></div>               
							<div id="seriesLabel${i + 1}Wrapper" class="col-11 col-sm-6 mb-1 gutter text-start">
								<span class="chart-series-label-span" id="seriesLabelSpan">${chartDatasets[i].seriesLabel}</span>
							</div>                
							<div class="p-2 col-1"><i id="seriesLabelIcon${i + 1}" class="fa-solid fa-2x fa-ellipsis-vertical"></i></div>							
						</div>
					</div>

					<div class="card-body text-success">
						<div class="d-flex">
							<div class="col-5 d-none d-sm-flex"><span style="font-size:x-large;">Series Description:</span></div>               
							<div id="seriesDescription${i + 1}Wrapper" class="col-11 col-sm-6 mb-1 gutter text-start">
								<span class="chart-series-description-span" id="seriesDescriptionSpan">${chartDatasets[i].seriesDescription}</span>
							</div>                
							<div class="p-2 col-1"><i id="seriesDescriptionIcon${i + 1}" class="fa-solid fa-2x fa-ellipsis-vertical"></i></div>							
						</div>
					</div>
			
					
				</div>
			</div>
		</div>`;
			
		chartAccordionWrapper.innerHTML += accordionHtmlItem;
	}
}

