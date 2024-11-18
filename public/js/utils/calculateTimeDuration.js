//example: startDate = '1990-01-15';
//example: endDate = '2024-11-17';

function calculateTimeDuration(startDate, endDate) {

	const start = moment(startDate);
	const end = moment(endDate);
	const years = end.diff(start, 'years');
	start.add(years, 'years');
	const months = end.diff(start, 'months');
	start.add(months, 'months');
	const days = end.diff(start, 'days');

	return { years, months, days };

}