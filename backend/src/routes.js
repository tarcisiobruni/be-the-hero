const express = require('express');
const routes = express.Router()
const ongController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

routes.post('/ongs', ongController.create)
routes.get('/ongs', ongController.index)

routes.post('/incidents', incidentController.create)
routes.get('/incidents', incidentController.index)
routes.delete('/incidents/:id', incidentController.delete)

routes.post('/profile', sessionController.create)

module.exports = routes;