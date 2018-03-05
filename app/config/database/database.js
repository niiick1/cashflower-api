const mongoose = require('mongoose'),

  databaseConfiguration = require('./database.config.json')

module.exports = () => {
  return mongoose.connect(databaseConfiguration.uri)
}
