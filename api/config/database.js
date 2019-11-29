const Sequelize = require('sequelize')

// module.exports = new Sequelize('gradeconverter', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })
module.exports = new Sequelize('degerlendi_harf', 'degerlendi_harf', 'Xhs6tjU6', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
