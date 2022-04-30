const { validationResult } = require('express-validator');

const Alimentation = require('../models/alimentation');



exports.fetchmy = async (req, res, next) => {
  try {
    const [allAlimentation] = await Alimentation.fetchmy(req.params.email);
    res.status(200).json(allAlimentation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchmyAlimentation = async (req, res, next) => {
  try {
    const [allAlimentation] = await Alimentation.fetchmyAlimentation(req.params.email);
    res.status(200).json(allAlimentation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAlimentation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const deb = req.body.deb;
  const fin = req.body.fin;
  const heure = req.body.heure;
  const aliment = req.body.aliment;
  const qte = req.body.qte;
  const email = req.body.email;
 
  try {
    const Alimentationdetails = {
      deb: deb,
      fin: fin,
      heure: heure,
      aliment: aliment,
      qte: qte,
      email:email
     
    };
   
    const result = await Alimentation.save(Alimentationdetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteAlimentation = async (req, res, next) => {
  try {
    const deleteResponse = await Alimentation.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
