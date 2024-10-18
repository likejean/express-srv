
const htmlClassCollection = {
    card: 'sensor-details',
    sensorCommentHtml: 'sensor-comment',
    descriptionHeaderHtml: 'sensor-description',
    sensorTypeHtml : 'sensor-type',
    sensorModelHtml: 'sensor-model',
    sensorMeasurementQuantityHtml: 'sensor-quantity',
    sensorCapacityRangeHtml: 'sensor-capacity',
    manufacturerNameHtml: 'sensor-manufacturer',
    calProcedureNameHtml: 'calibration-procedures-badges',
    calProcedureInfoHtml: 'calibration-procedures-list'
}

//object stores all html elements being dynamically updated by Javascript
const htmlElementCollection = {};

function getHtmlElementsById () {
    for (const [key, value] of Object.entries(htmlClassCollection)) { 
        htmlElementCollection[key] = document.getElementById(value);
    }
    return htmlElementCollection;
}

