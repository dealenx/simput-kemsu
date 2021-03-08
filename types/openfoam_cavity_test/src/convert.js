/*
var template = require('./templates/demo.hbs');

module.exports = function (dataModel) {
  var results = {
      wow: 'this is a wow file. very magic',
      bar: 'bar far mar gar har har har !',
    },
    error = null;

  // FIXME

  return { results: results, error: error };
};*/

var template = require('./templates/run.hbs');

module.exports = function convert(dataModel) {
  const results = {};
  const error = null;

  console.log('dataModel', dataModel);

  try {
    const nu = dataModel.data.CavityFields[0].attr1['nu'].value[0];
    const deltaT = dataModel.data.CavityFields[0].attr1['deltaT'].value[0];
    const endTime = dataModel.data.CavityFields[0].attr1['endTime'].value[0];

    results['run.sh'] = template({ nu, deltaT, endTime });
  } catch (e) {
    console.log('Error trying to convert model for generating run.sh', e);
  }

  return { results, error };
};
