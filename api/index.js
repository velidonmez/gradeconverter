const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// import models
const Universite = require('./models/Universite')
const UuGradingSystem = require('./models/UuGradingSystem')
const UniversityType = require('./models/UniversityType')
const GradingTemplate = require('./models/GradingTemplate')

// Database
const db = require('./config/database')
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// Test DB
db.authenticate().then(() => console.log('Database connected!!!...')).catch(err => console.log('Error: ' + err))

// Crud university
// Uni data
app.post('/university', async (req, res) => {
  await Universite.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch(err => console.log({ err }))
})

// Add a uni
app.post('/insertUniData', async (req, res) => {
  const data = req.body.dataset
  // Insert into table
  await Universite.create({
    okulAdi: data.okulAdi,
    harfAraliklari: data.harfAraliklari,
    url: data.url
  }).then((response) => {
    res.status(200).json(response)
    console.log('Universite added: ' + data)
  }).catch((err) => {
    console.log('Insert failed with error: ' + err)
  })
})

// Update a uni
app.post('/updateUniData', async (req, res) => {
  const data = req.body.dataset
  await Universite.update({ okulAdi: data.name, url: data.url, harfAraliklari: data.harfAraliklari },
    { where: { id: data.id } }
  ).then(() => {
    console.log('Update succesful id: ' + data.id)
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    return 0
  })
})

// Delete a uni based on Id
app.post('/deleteUniData', async (req, res) => {
  const data = req.body.dataset
  await Universite.destroy({ where: { id: data.id } }
  ).then(() => {
    console.log('Delete succesful id: ' + data.id)
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    return 0
  })
})

// CRUD uskudar uni not sistemi
// UU grades data
app.post('/uuGradeSystem', async (req, res) => {
  await UuGradingSystem.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch(err => console.log({ err }))
})

// Update a UU Grades
app.post('/updateUUGradeSystem', async (req, res) => {
  const data = req.body.dataset
  await UuGradingSystem.update({ okulAdi: data.okulAdi, harfAraliklari: data.harfAraliklari },
    { where: { id: data.id } }
  ).then(() => {
    console.log('Update succesful id: ' + data.id)
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    return 0
  })
})

// CRUD not taslakları
// get templates
app.post('/gradeTemplates', async (req, res) => {
  await GradingTemplate.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch(err => console.log({ err }))
})

// Add a template
app.post('/insertGradeTemplate', async (req, res) => {
  const data = req.body.dataset
  // Insert into table
  await GradingTemplate.create({
    name: data.name,
    harfAraliklari: data.harfAraliklari
  }).then((res) => {
    console.log('Template added: ' + data)
  }).catch((err) => {
    console.log('Insert failed with error: ' + err)
  })
})

// Update a UU Grades
app.post('/updateGradeTemplate', async (req, res) => {
  const data = req.body.dataset
  await GradingTemplate.update({ name: data.name, harfAraliklari: data.harfAraliklari },
    { where: { id: data.id } }
  ).then(() => {
    console.log('Update succesful id: ' + data.id)
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    return 0
  })
})

// Delete a template based on Id
app.post('/deleteGradeTemplate', async (req, res) => {
  const data = req.body.dataset
  await GradingTemplate.destroy({ where: { id: data.id } }
  ).then(() => {
    console.log('Delete succesful id: ' + data.id)
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    return 0
  })
})

// Crud Universite türü
// get university types
app.post('/universityTypes', async (req, res) => {
  await UniversityType.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch(err => console.log({ err }))
})

module.exports = {
  path: '/api',
  handler: app
}
