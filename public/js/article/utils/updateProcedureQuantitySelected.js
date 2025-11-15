calibrationProcedureQuantity.innerText = 0;

//this function updates the quantity of selected calibration procedures
resetProcedureQuantityButton.onclick = (event) => {
	event.preventDefault();
	if (calibrationProcedureQuantity.innerText > 0) calibrationProcedureQuantity.innerText = 0;
	_articlefactory.newArticleFormInputs["calibrationProcedures"].value = [];
};