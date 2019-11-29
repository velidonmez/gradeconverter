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
  }).catch((err) => {
    console.log({ err })
    res.status(404).json()
  })
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
  }).catch((err) => {
    console.log('Insert failed with error: ' + err)
    res.status(404).json()
  })
})

// Update a uni
app.post('/updateUniData', async (req, res) => {
  const data = req.body.dataset
  await Universite.update({ okulAdi: data.name, url: data.url, harfAraliklari: data.harfAraliklari },
    { where: { id: data.id } }
  ).then(() => {
    res.status(200).json()
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    res.status(404).json()
  })
})

// Delete a uni based on Id
app.post('/deleteUniData', async (req, res) => {
  const data = req.body.dataset
  await Universite.destroy({ where: { id: data.id } }
  ).then(() => {
    res.status(200).json()
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    res.status(404).json()
  })
})

// CRUD uskudar uni not sistemi
// UU grades data
app.post('/uuGradeSystem', async (req, res) => {
  await UuGradingSystem.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch((err) => {
    console.log({ err })
    res.status(404).json()
  })
})

// Update a UU Grades
app.post('/updateUUGradeSystem', async (req, res) => {
  const data = req.body.dataset
  await UuGradingSystem.update({ okulAdi: data.okulAdi, harfAraliklari: data.harfAraliklari },
    { where: { id: data.id } }
  ).then(() => {
    res.status(200).json()
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    res.status(404).json()
  })
})

// CRUD not taslakları
// get templates
app.post('/gradeTemplates', async (req, res) => {
  await GradingTemplate.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch((err) => {
    console.log({ err })
    res.status(404).json()
  })
})

// Add a template
app.post('/insertGradeTemplate', async (req, res) => {
  const data = req.body.dataset
  // Insert into table
  await GradingTemplate.create({
    name: data.name,
    harfAraliklari: data.harfAraliklari
  }).then((res) => {
    res.status(200).json()
  }).catch((err) => {
    console.log('Insert failed with error: ' + err)
    res.status(404).json()
  })
})

// Update a UU Grades
app.post('/updateGradeTemplate', async (req, res) => {
  const data = req.body.dataset
  await GradingTemplate.update({ name: data.name, harfAraliklari: data.harfAraliklari },
    { where: { id: data.id } }
  ).then(() => {
    res.status(200).json()
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    res.status(404).json()
  })
})

// Delete a template based on Id
app.post('/deleteGradeTemplate', async (req, res) => {
  const data = req.body.dataset
  await GradingTemplate.destroy({ where: { id: data.id } }
  ).then(() => {
    res.status(200).json()
  }).catch(function (err) {
    console.log('update failed with error: ' + err)
    res.status(404).json()
  })
})

// Crud Universite türü
// get university types
app.post('/universityTypes', async (req, res) => {
  await UniversityType.findAll().then((uni) => {
    res.status(200).json(uni)
  }).catch((err) => {
    console.log({ err })
    res.status(404).json()
  })
})

module.exports = {
  path: '/api',
  handler: app
}
