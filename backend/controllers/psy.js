const { validationResult } = require('express-validator');

const Psy = require('../models/psy');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPsys] = await Psy.fetchAll(req.params.email);
    res.status(200).json(allPsys);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchlast = async (req, res, next) => {
  try {
    const [allPsys] = await Psy.fetchlast(req.params.id);
    res.status(200).json(allPsys);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.postPsy = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const patient = req.body.patient;
  const medecin = req.body.medecin;
  const trouble = req.body.trouble;
  const addictions = req.body.addictions; 
  const difficultes = req.body.difficultes;
 
  const note = req.body.note;

  try {
    const Psydetails = {
      patient: patient,
      medecin: medecin,
      trouble: trouble,
      addictions : addictions,
      difficultes : difficultes,
      
      note : note,

    };
    const result = await Psy.save(Psydetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePsy = async (req, res, next) => {
  try {
    const deleteResponse = await Psy.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
