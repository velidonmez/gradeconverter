const Sequelize = require('sequelize')
const db = require('../config/database')

const GradingTemplate = db.define('GradingTemplate', {
  name: {
    type: Sequelize.STRING
  },
  harfAraliklari: {
    type: Sequelize.STRING
  }
})
module.exports = GradingTemplate
