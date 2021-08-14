const { validationResult } = require('express-validator');

const Patient = require('../models/patient');
var cache = require('memory-cache');


exports.count = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.count();
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.countp = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.countp(req.params.id);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.fetchAll(req.params.id);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.mydata = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.mydata(req.params.email);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.fetchmy = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.fetchmy(req.params.id);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPatient = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const email = req.body.email;
  const patientid = req.body.patientid;
  const secret = req.body.secret;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const sexe = req.body.sexe;
  const age = req.body.age;
  const poids = req.body.poids;
  const taille = req.body.taille;
  const periode = req.body.periode;
  const etat = req.body.etat;
  const dateint = req.body.dateint;
  const imc = req.body.imc;
  const classe = req.body.classe;
  const img = req.body.img;
  const classeimg = req.body.classeimg;
  const pideal = req.body.pideal;

  const medecin = req.body.medecin
  try {
    const Patientdetails = {
      email: email,
      patientid: patientid,
      secret: secret,
      nom: nom,
      prenom: prenom,
      sexe: sexe,
      age: age,
      poids: poids,
      taille: taille,
      periode: periode,
      etat: etat,
      dateint: dateint,
      imc:imc,
      classe:classe,
      img:img,
      classeimg:classeimg,
      pideal:pideal,
      medecin:medecin
      //imc: (parseInt(poids)/ (parseInt(taille)*parseInt(taille)))
    };
    //console.log(imc)
    const result = await Patient.save(Patientdetails);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const deleteResponse = await Patient.delete(req.params.id);
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
    
    const idResponse = await Patient.postid(req.params.id);
   
  //var normalObj = Object.assign({}, idResponse[0].patientid);
 //console.log(normalObj);

     res.status(200).json(idResponse);
    idd = JSON.parse(JSON.stringify(idResponse[0][0]));

    //console.log(Object.values(idd));
    idsec =Object.values(idd);
    //console.log(idsec[1]);
    cache.put('id', idsec[0]);
    //console.log(cache.get('id'))
    cache.put('secret', idsec[1]);
    //console.log(cache.get('secret'))
  
            //console.log(idResponse[0]["idpatient"]); 
            //console.log(idResponse[0].secret);
        
    
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  
}
;
