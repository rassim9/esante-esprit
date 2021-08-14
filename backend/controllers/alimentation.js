const { validationResult } = require('express-validator');

const Alimentation = require('../models/alimentaion');



exports.fetchmy = async (req, res, next) => {
  try {
    const [allAlimentaion] = await Alimentaion.fetchmy(req.params.id);
    res.status(200).json(allAlimentaion);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchmyAlimentaion = async (req, res, next) => {
  try {
    const [allAlimentaion] = await Alimentaion.fetchmyAlimentaion(req.params.email);
    res.status(200).json(allAlimentaion);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAlimentaion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const deb = req.body.deb;
  const fin = req.body.fin;
  const heure = req.body.heure;
  const aliment = req.body.aliment;
  const qte = req.body.qte;
  const email = req.body.email;
 
  try {
    const Alimentaiondetails = {
      deb: deb,
      fin: fin,
      heure: heure,
      aliment: aliment,
      qte: qte,
      email:email
     
    };
   
    const result = await Alimentaion.save(Alimentaiondetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteAlimentaion = async (req, res, next) => {
  try {
    const deleteResponse = await Alimentaion.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
