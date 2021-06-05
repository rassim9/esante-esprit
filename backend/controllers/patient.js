const { validationResult } = require('express-validator');

const Patient = require('../models/patient');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.fetchAll();
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

  try {
    const Patientdetails = {
      email: email,
      patientid: patientid,
      secret: secret,
    };
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
