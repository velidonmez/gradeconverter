const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gradeconverter'
})

connection.connect(function (err) {
  if (err) { throw err }
  console.log('Connected to mySql!')
})

// ########################################################################################## start HELPERS
const createResponse = (status, data = false) => {
  if (data) {
    return {
      response: data,
      status
    }
  } else {
    return {
      status
    }
  }
}

// ########################################################################################## start GENERAL FUNCTIONS
const insert = (table, data, dataId = false) => {
  const sql = 'INSERT INTO ' + table + ' SET ?'
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (error, result) => {
      data.id = result.insertId
      if (!error) {
        resolve(createResponse(true, {
          result,
          data,
          insertId: dataId === false ? data.id : dataId,
          dbStatus: result.affectedRows !== 0
        }))
      } else {
        resolve(createResponse(false, error))
      }
    })
  })
}

// api
app.post('/insertUniData', async (req, res) => {
  await insert('universite', {
    okul_adi: req.body.okulAdi,
    harf_araliklari: req.body.harfAraliklari
  }).then((res) => {
    res.status(200).json(createResponse(true, res))
  }).catch(() => {
    res.status(200).json(createResponse(false, { msg: 'Invalid Data' }))
  })
})

app.post('/updateUniData', async (req, res) => {
  const data = req.body.dataset
  const sql = `UPDATE universite SET okul_adi = '${data.okul_adi}',harf_araliklari = '${data.harf_araliklari}',date_time = CURRENT_TIME() WHERE id = '${data.id}'`
  await connection.query(sql, (err, result) => {
    if (err) { throw err }
    res.status(200).json(createResponse(true, result))
  })
})

app.post('/deleteUniData', async (req, res) => {
  const data = req.body.dataset
  const sql = `DELETE FROM universite WHERE id = '${data.id}'`
  console.log(sql)
  await connection.query(sql, (err, result) => {
    if (err) { throw err }
    res.status(200).json(createResponse(true, result))
  })
})

app.post('/university', async (req, res) => {
  const sql = 'SELECT * FROM universite'
  await connection.query(sql, (err, result, fields) => {
    if (err) { throw err }
    res.status(200).json(createResponse(true, result))
  })
})

app.post('/uuGradeSystem', async (req, res) => {
  const sql = 'SELECT * FROM uu_grading_system'
  await connection.query(sql, (err, result, fields) => {
    if (err) { throw err }
    res.status(200).json(createResponse(true, result))
  })
})

app.post('/updateUUGradeSystem', async (req, res) => {
  const data = req.body.dataset
  const sql = `UPDATE uu_grading_system SET okul_adi = '${data.okul_adi}',harf_araliklari = '${data.harf_araliklari}',date_time = CURRENT_TIME() WHERE id = '${data.id}'`
  await connection.query(sql, (err, result) => {
    if (err) { throw err }
    res.status(200).json(createResponse(true, result))
  })
})

module.exports = {
  path: '/api',
  handler: app
}
