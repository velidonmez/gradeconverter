const Sequelize = require('sequelize')
const db = require('../config/database')

const UuGradingSystem = db.define('UuGradingSystem', {
  okulAdi: {
    type: Sequelize.STRING
  },
  harfAraliklari: {
    type: Sequelize.STRING
  }
})
module.exports = UuGradingSystem
