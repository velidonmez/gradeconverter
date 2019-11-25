const Sequelize = require('sequelize')
const db = require('../config/database')

const Universite = db.define('universite', {
  okulAdi: {
    type: Sequelize.STRING
  },
  okulTuru: {
    type: Sequelize.STRING
  },
  harfAraliklari: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  }
})
module.exports = Universite
