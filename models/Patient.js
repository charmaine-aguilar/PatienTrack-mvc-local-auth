const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema(
    {
      patientID:    { type: String, unique: true },
      firstName:    { type: String, required: true },
      lastName:     { type: String, required: true },
      dateOfbirth:  { type: String, required: true }
    }
  )
  
  // Add a third parameter to specify what collection to use
  // const model = mongoose.model('Patient', PatientSchema, 'patonts')
  const model = mongoose.model('Patient', PatientSchema)
  
  module.exports = model