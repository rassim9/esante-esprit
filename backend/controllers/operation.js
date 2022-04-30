const { validationResult } = require('express-validator');

const Operation = require('../models/operation');
const sgMail = require('@sendgrid/mail')

var messagebird = require('messagebird')('hGw7HzAqfXXu1dGwgbnCkUCcq');




exports.fetchmy = async (req, res, next) => {
  try {
    const [allOperation] = await Operation.fetchmy(req.params.email);
    res.status(200).json(allOperation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchmyOperation = async (req, res, next) => {
  try {
    const [allOperation] = await Operation.fetchmy(req.params.email);
    res.status(200).json(allOperation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postOperation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const patient = req.body.patient;
  const medecin = req.body.medecin;
  const etablissement = req.body.etablissement;
  const date = req.body.date;
  const heure = req.body.heure;
  const precautions = req.body.precautions;
  const note = req.body.note;
 
  try {
    const Operationdetails = {
      patient: patient,
      medecin: medecin,
      etablissement: etablissement,
      date: date,
      heure: heure,
      precautions:precautions,
      note:note
     
    };
   
    const result = await Operation.save(Operationdetails);
    /*messagebird.messages.create({
    originator : '+21698441761',
    recipients : [ '+21652927337' ],
    body : 'Cher patient, vous êtes maintenant en mesure de vous faire opérer Votre intervention par le Docteur'+medecin+' est donc bien confirmée le'+date+heure+' l’établissement de santé '+etablissement,
},
function (err, response) {
    if (err) {
    console.log("ERROR:");
    console.log(err);
} else {
    console.log("SUCCESS:");
    console.log(response);
        }
});*/
    res.status(201).json({ message: 'operation Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteOperation = async (req, res, next) => {
  try {
    const deleteResponse = await Operation.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.postid = async (req, res, next) => {
  try {
    sgMail.setApiKey('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');
    const idResponse = await Operation.postid(req.params.email);
    res.status(200).json(idResponse);
    console.log(idResponse);
    const email=req.params.email
    console.log(email);
    const msg= {
      to: email, // Change to your recipient
      from: 'rassim.zouari@esprit.tn', // Change to your verified sender
      subject: 'Decision finale',
      text: 'Bonjour patient ',
      html: '<strong>  Bonjour, je voulais vous informé que vous etes pas eligible pour l"operation .nous sommes vraiment desolé .</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  
}
