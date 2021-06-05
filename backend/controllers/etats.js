const { validationResult } = require('express-validator');

const Etat = require('../models/etat');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allEtats] = await Etat.fetchAll();
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
  const desc = req.body.desc;
  const username = req.body.username;

  try {
    const etatdetails = {
      forme: forme,
      desc: desc,
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
