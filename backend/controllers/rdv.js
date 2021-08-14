const { validationResult } = require('express-validator');
const Rdv = require('../models/rdv');

exports.getAllRdv = async(req,res,next) => {
    try {
const [allRdv] = await Rdv.fetchAll(req.params.id);
res.status(200).json(allRdv);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};

exports.getAllRdvpatient = async(req,res,next) => {
  try {
const [allRdv] = await Rdv.fetchAllpatient(req.params.id);
res.status(200).json(allRdv);
  }catch(err) {
if (!err.statusCode){
  err.statusCode = 500
}
next(err);
  }
};


exports.postRdv = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return;
  
    const title = req.body.title;
    const date = req.body.date;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
  
    try {
      const Rdvdetails = {
        title: title,
        date: date,
        p1: p1,
        p2: p2,
      };
      const result = await Rdv.save(Rdvdetails);
      res.status(201).json({ message: 'Posted!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.deleteRdv = async(req,res,next) => {
    try {
const deleteResponse = await Rdv.delete(req.params.id);
res.status(200).json(deleteResponse);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};