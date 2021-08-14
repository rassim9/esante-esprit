const { validationResult } = require('express-validator');

const Medicament = require('../models/medicament');



exports.fetchmy = async (req, res, next) => {
  try {
    const [allMedicament] = await Medicament.fetchmy(req.params.id);
    res.status(200).json(allMedicament);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchmymedicament = async (req, res, next) => {
  try {
    const [allMedicament] = await Medicament.fetchmymedicament(req.params.email);
    res.status(200).json(allMedicament);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postMedicament = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const nom = req.body.nom;
  const dosage = req.body.dosage;
  const duree = req.body.duree;
  const autre = req.body.autre;
  const patient = req.body.patient;
  const email = req.body.email;
 
  try {
    const Medicamentdetails = {
      nom: nom,
      dosage: dosage,
      duree: duree,
      autre: autre,
      patient: patient,
      email:email
     
    };
   
    const result = await Medicament.save(Medicamentdetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteMedicament = async (req, res, next) => {
  try {
    const deleteResponse = await Medicament.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
