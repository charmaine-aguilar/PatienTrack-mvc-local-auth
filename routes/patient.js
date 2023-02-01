const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patient')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', ensureAuth, patientController.getPatientHomePage)

router.get('/add', patientController.getAddPatientPage)
router.post('/add', patientController.addPatient)

router.get('/browse', patientController.getAllPatients)

router.get('/:patientID', patientController.getOnePatient)

router.delete('/:patientID/delete', patientController.deleteOnePatient)

router.get('/:patientID/edit', patientController.getEditPatientInfoPage)
router.put('/:patientID/edit', patientController.editPatientInfo)

module.exports = router