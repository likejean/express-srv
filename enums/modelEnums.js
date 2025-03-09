const calibrationPrinciples = [
    'Dimensional',
    'Temperature',
    'Pressure',
    'Force',
    'Humidity',
    'Alignment',
    'Electrical',
    'Radio',
    'Flow'
];

const calibrationPriorities = [
    'Mandatory',
    'Optional',
    'Unserviceable',
    'Broken'
];

const calibrationFrequencies = [
    'Weekly',
    'Biweekly',
    'Monthly',
    'Quarterly',
    'Semiannually',
    'Annually',
    'Discretionary'
];

const calibrationUnits = [
	'in',
	'microstrain',
	'kips',
	'lbf',
	'Volts',
	'degrees',
	'%'
];

const userLevels = [
    'Admin',
    'User',
    'Quest'
];

module.exports = {
	calibrationPrinciples,
	calibrationPriorities,
	calibrationFrequencies,
	calibrationUnits,
	userLevels
}



