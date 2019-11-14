const Sequelize = require('sequelize')
const db = require('../config/database')

const Test = db.define('test', {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Test
