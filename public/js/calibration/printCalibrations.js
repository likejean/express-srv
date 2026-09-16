const calibrationPrintModal = document.getElementById("calibrationPrintModal");
const calibrationPrintForm = document.getElementById("calibrationPrintForm");
const calibrationPrintReport = document.getElementById("calibrationPrintReport");
const calibrationPrintReportBody = document.getElementById("calibrationPrintReportBody");
const calibrationPrintReportTitle = document.getElementById("calibrationPrintReportTitle");
const calibrationPrintReportDate = document.getElementById("calibrationPrintReportDate");

function getPrintableCalibrations(category) {
    const calibrations = _store.calibrations || [];
    const now = new Date();

    return calibrations.filter((calibration) => {
        const isOutOfService = !calibration.activeCalibration;
        const isExpired = calibration.activeCalibration && new Date(calibration.dueCalibrationDate) < now;
        const isExtended = calibration.activeCalibration && !isExpired && calibration.calibrationExtended;

        if (category === "expired") return isExpired;
        if (category === "extended") return isExtended;
        if (category === "outOfService") return isOutOfService;
        return true;
    });
}

function createPrintReport(category) {
    const printableCalibrations = getPrintableCalibrations(category).sort((firstCalibration, secondCalibration) => {
        return new Date(firstCalibration.dueCalibrationDate) - new Date(secondCalibration.dueCalibrationDate);
    });
    const categoryLabels = {
        all: "All Calibrations",
        expired: "Expired Calibrations",
        extended: "Extended Calibrations",
        outOfService: "Out of Service Calibrations",
    };

    calibrationPrintReportTitle.textContent = categoryLabels[category];
    calibrationPrintReportDate.textContent = `Generated: ${moment().format("MM/DD/YYYY")}`;
    calibrationPrintReportBody.replaceChildren();

    printableCalibrations.forEach((calibration, index) => {
        const row = document.createElement("tr");
        const values = [
            index + 1,
            calibration.sensorId?.EID || "-",
            calibration.sensorId?.description || "-",
            calibration.procedureId?.procedureName || "-",
            moment.utc(calibration.dueCalibrationDate).format("MM/DD/YYYY"),
        ];

        values.forEach((value, valueIndex) => {
            const cell = document.createElement(valueIndex === 0 ? "th" : "td");
            cell.textContent = value;
            if (valueIndex === 0) cell.scope = "row";
            row.appendChild(cell);
        });

        calibrationPrintReportBody.appendChild(row);
    });

    if (printableCalibrations.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No calibrations found for this category.";
        row.appendChild(cell);
        calibrationPrintReportBody.appendChild(row);
    }
}

calibrationPrintForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPrintReport(calibrationPrintForm.elements.category.value);
    bootstrap.Modal.getOrCreateInstance(calibrationPrintModal).hide();
    window.print();
});
