const { validationResult } = require('express-validator');

const Etat = require('../models/etat');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allEtats] = await Etat.fetchAll(req.params.email);
    res.status(200).json(allEtats);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchlast = async (req, res, next) => {
  try {
    const [allEtats] = await Etat.fetchlast(req.params.id);
    res.status(200).json(allEtats);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.postEtat = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const forme = req.body.forme;
  const description = req.body.description;
  const temp = req.body.temp;
  const pansement = req.body.pansement; 
  const saignment = req.body.saignment;
  const medicament = req.body.medicament;
 
  const douleur = req.body.douleur;
  const niveau = req.body.niveau;
  const note = req.body.note;
  const username = req.body.username;

  try {
    const etatdetails = {
      forme: forme,
      description: description,
      temp: temp,
      pansement : pansement,
      saignment : saignment,
      medicament : medicament,
      douleur : douleur,
      niveau : niveau,
      note : note,
      username: username,
    };
    const result = await Etat.save(etatdetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteEtat = async (req, res, next) => {
  try {
    const deleteResponse = await Etat.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
