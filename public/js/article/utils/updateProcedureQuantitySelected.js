calibrationProcedureQuantity.innerText = 0;

resetProcedureQuantityButton.onclick = (event) => {
	event.preventDefault();
	if (calibrationProcedureQuantity.innerText > 0) calibrationProcedureQuantity.innerText = 0;
	_articlefactory.newArticleFormInputs["calibrationProcedures"].value = [];
};