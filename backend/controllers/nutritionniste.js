const { validationResult } = require('express-validator');

const Nutritionniste = require('../models/nutritionniste');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allNutritionnistes] = await Nutritionniste.fetchAll(req.params.email);
    res.status(200).json(allNutritionnistes);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchlast = async (req, res, next) => {
  try {
    const [allNutritionnistes] = await Nutritionniste.fetchlast(req.params.id);
    res.status(200).json(allNutritionnistes);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.postNutritionniste = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const patient = req.body.patient;
  const medecin = req.body.medecin;
  const Activite = req.body.Activite;
  const Tabac = req.body.Tabac; 
  const diabete = req.body.diabete;
  const Consultation = req.body.Consultation;
 
  const Regime = req.body.Regime;
  const Reguliere = req.body.Reguliere;
  const Alimentation = req.body.Alimentation;
  const Hydratation = req.body.Hydratation;
  const Obesite = req.body.Obesite;
  const Pds = req.body.Pds;
  const note = req.body.note;

  try {
    const Nutritionnistedetails = {
      patient: patient,
      medecin: medecin,
      Activite: Activite,
      Tabac : Tabac,
      diabete : diabete,
      Consultation : Consultation,
      Regime : Regime,
      Reguliere : Reguliere,
      Alimentation : Alimentation,
      Hydratation: Hydratation,
      Obesite: Obesite,
      Pds: Pds,
      note : note,

    };
    const result = await Nutritionniste.save(Nutritionnistedetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNutritionniste = async (req, res, next) => {
  try {
    const deleteResponse = await Nutritionniste.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
