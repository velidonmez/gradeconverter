const Sequelize = require('sequelize')
const db = require('../config/database')

const UniversityType = db.define('UniversityType', {
  name: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  }
})
module.exports = UniversityType
