module.exports = {
    type: 'openfoam_helmholtz',
    model: require('./model.json'),
    lang: require('./lang'),
    convert: require('./convert.js'),
    parse: null
  }