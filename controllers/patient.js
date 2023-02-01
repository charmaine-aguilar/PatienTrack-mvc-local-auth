const Patient = require('../models/Patient')

module.exports = {
    getPatientHomePage: (req,res)=>{
        res.render('patient/patient.ejs')
    },
    getAddPatientPage: (req,res)=>{
        res.render('patient/addPatient.ejs')
    },
    addPatient: async (req,res)=>{
        let generateID = _ => {
            let minimum = 100000
            let maximum = 500000
            return (Math.floor(Math.random() * (maximum - minimum + 1)) + minimum).toString()
        }

        try{
            await Patient.create({
                patientID: generateID(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfbirth: req.body.dateOfbirth
            })
            console.log('Patient has been added!')
            res.redirect('/patient/add')
        }catch(err){
            console.log(err)
        }
    },
    getAllPatients: async (req,res)=>{
        try{
            // Find all the documents in the database
            const patients = await Patient.find()
            res.render('patient/browsePatient.ejs', {patients: patients})
        }catch(err){
            console.log(err)
        }
    },
    getOnePatient: async (req,res)=>{
        try{
            const patient = await Patient.findOne({
                patientID: req.params.patientID
            })
            console.log("found: " + patient)
            res.render('patient/patientProfile.ejs', { patient: patient })
        }catch(err){
            console.log(err)
        }
    },
    deleteOnePatient: async (req,res)=>{
        try{
            await Patient.findOneAndDelete({
                patientID: req.params.patientID
            })
            console.log('Patient has been deleted!')
            res.json('Patient has been deleted.')
        }catch(err){
            console.log(err)
        }
    },
    getEditPatientInfoPage: async (req,res)=>{
        try{
            const patient = await Patient.findOne({
                patientID: req.params.patientID
            })
            console.log("found: " + patient)
            res.render('patient/editPatient.ejs', { patient: patient })
        }catch(err){
            console.log(err)
        }
    },
    editPatientInfo: async (req,res)=>{
        try{
            const patient = await Patient.findOneAndUpdate(
                {patientID: req.params.patientID},
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dateOfbirth: req.body.dateOfbirth
                })
            res.json('Update successful!')
        }catch(err){
            console.log(err)
        }
    }  
}
    // TODO: Fix error somewhere here?