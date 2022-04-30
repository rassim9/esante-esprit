const { validationResult } = require('express-validator');

const Cardiologue = require('../models/cardiologue');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allCardiologue] = await Cardiologue.fetchAll(req.params.email);
    res.status(200).json(allCardiologue);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchlast = async (req, res, next) => {
  try {
    const [allCardiologue] = await Cardiologue.fetchlast(req.params.id);
    res.status(200).json(allCardiologue);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.postCardiologue = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const patient = req.body.patient;
  const medecin = req.body.medecin;
  const hospitalise = req.body.hospitalise;
  const accident = req.body.accident; 
  const prob = req.body.prob;
  const anomalie = req.body.anomalie;
 
  const traitement = req.body.traitement;
  const symptome = req.body.symptome;
  
  const note = req.body.note;

  try {
    const Cardiologuedetails = {
      patient: patient,
      medecin: medecin,
      hospitalise: hospitalise,
      accident : accident,
      prob : prob,
      anomalie : anomalie,
      traitement : traitement,
      symptome : symptome,
      
      note : note,

    };
    const result = await Cardiologue.save(Cardiologuedetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteCardiologue = async (req, res, next) => {
  try {
    const deleteResponse = await Cardiologue.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
