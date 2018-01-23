exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds111618.mlab.com:11618/workout-selector';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin@ds111618.mlab.com:11618/workout-selector';
exports.PORT = process.env.PORT || 8088;
