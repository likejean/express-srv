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
    'Fahrenheit',
	'microstrain',
	'kip',
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

const scienceBranch = [
    'Physics',
    'Mathematics',
    'Instrumentation',
    'Automation',
    'Electronics',
    'Computer Science',
    'Engineering',
    'Chemistry',
    'Biology',
    'Geology',
    'Astronomy'
];

module.exports = {
	calibrationPrinciples,
	calibrationPriorities,
	calibrationFrequencies,
    scienceBranch,
	calibrationUnits,
	userLevels
}



