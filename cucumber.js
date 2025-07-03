module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/features/**/*.ts',
      './automation/*.ts'            // include hook and world
    ],
    paths: ['tests/features/**/*.feature'],
    format: ['progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    defaultTimeout: 10000,
  }
};
