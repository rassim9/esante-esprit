const { validationResult } = require('express-validator');

const Patient = require('../models/patient');
var cache = require('memory-cache');
const sgMail = require('@sendgrid/mail')



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
    const [allPatients] = await Patient.countp(req.params.email);
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
    const [allPatients] = await Patient.fetchAll(req.params.email);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchAllpatients = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.fetchAllpatients();
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
    const [allPatients] = await Patient.fetchmy(req.params.email);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchop = async (req, res, next) => {
  try {
    const [allPatients] = await Patient.fetchmy(req.params.email);
    res.status(200).json(allPatients);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.update = async(req,res,next) => {
  try {
const putResponse = await Patient.update(req.body.email,req.body.operable);
res.status(200).json(putResponse);
  }catch(err) {
if (!err.statusCode){
  err.statusCode = 500
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
  const type = req.body.type;
  const rpps = req.body.rpps;
  const dateint = req.body.dateint;
  const imc = req.body.imc;
  const classe = req.body.classe;
  const img = req.body.img;
  const classeimg = req.body.classeimg;
  const pideal = req.body.pideal;

  const medecin = req.body.medecin
  const Nutritionniste=req.body.Nutritionniste;
  const Psychologue=req.body.Psychologue;
  const Cardiologue=req.body.Cardiologue;
  const Soignant=req.body.Soignant;
  const autre=req.body.autre;
  cache.put('nut', Nutritionniste);
    console.log(cache.get('nut'))
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
      type: type,
      rpps: rpps,
      dateint: dateint,
      imc:imc,
      classe:classe,
      img:img,
      classeimg:classeimg,
      pideal:pideal,
      medecin:medecin,
      Nutritionniste:Nutritionniste,
      Psychologue:Psychologue,
      Cardiologue:Cardiologue,
      Soignant:Soignant,
      autre:autre,


      //imc: (parseInt(poids)/ (parseInt(taille)*parseInt(taille)))
    };
    //console.log(imc)
    const result = await Patient.save(Patientdetails);
    sgMail.setApiKey('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');

 const nut=cache.get('nut')
    const msg1 = {
      to: nut, // Change to your recipient
      from: 'rassim.zouari@esprit.tn', // Change to your verified sender
      subject: 'Nouveau Patient',
      text: 'Bonjour Doctor ,vous étes membre de lequipe ',
      html: '<strong> Cher confrère Vous faites partie du collègue multidisciplinaire pour la prise en charge du '+nom+ prenom+' à une chirurgie de l’obésité de sécurité sociale. Merci de cliquer sur le lien ci-dessous pour vous connecter à la plateforme de suivi. Vous serez invité à y compléter le dossier du patient lors de votre prochain RDV avec le patient. »</strong>',
    }
    sgMail
      .send(msg1)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    
    const msg2 = {
      to: Cardiologue, // Change to your recipient
      from: 'rassim.zouari@esprit.tn', // Change to your verified sender
      subject: 'Nouveau Patient',
      text: 'Bonjour Doctor ,vous étes membre de lequipe ',
      html: '<strong> Cher confrère Vous faites partie du collègue multidisciplinaire pour la prise en charge du '+nom+ prenom+' à une chirurgie de l’obésité de sécurité sociale. Merci de cliquer sur le lien ci-dessous pour vous connecter à la plateforme de suivi. Vous serez invité à y compléter le dossier du patient lors de votre prochain RDV avec le patient. »</strong>',
    }
    sgMail
      .send(msg2)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
      const msg3 = {
        to: Psychologue, // Change to your recipient
        from: 'rassim.zouari@esprit.tn', // Change to your verified sender
        subject: 'Nouveau Patient',
        text: 'Bonjour Doctor ,vous étes membre de lequipe ',
        html: '<strong> Cher confrère Vous faites partie du collègue multidisciplinaire pour la prise en charge du '+nom+ prenom+' à une chirurgie de l’obésité de sécurité sociale. Merci de cliquer sur le lien ci-dessous pour vous connecter à la plateforme de suivi. Vous serez invité à y compléter le dossier du patient lors de votre prochain RDV avec le patient. »</strong>',
      }
      sgMail
        .send(msg3)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })

        const msg4 = {
          to: autre, // Change to your recipient
          from: 'rassim.zouari@esprit.tn', // Change to your verified sender
          subject: 'Nouveau Patient',
          text: 'Bonjour Doctor ,vous étes membre de lequipe ',
          html: '<strong> Cher confrère Vous faites partie du collègue multidisciplinaire pour la prise en charge du '+nom+ prenom+' à une chirurgie de l’obésité de sécurité sociale. Merci de cliquer sur le lien ci-dessous pour vous connecter à la plateforme de suivi. Vous serez invité à y compléter le dossier du patient lors de votre prochain RDV avec le patient. »</strong>',
        }
        sgMail
          .send(msg4)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })





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
    
    const idResponse = await Patient.postid(req.params.email);
   
  //var normalObj = Object.assign({}, idResponse[0].patientid);
 //console.log(normalObj);

     res.status(200).json(idResponse);
    idd = JSON.parse(JSON.stringify(idResponse[0][0]));

    console.log(Object.values(idd));
    idsec =Object.values(idd);
    //console.log(idsec[1]);
    cache.put('id', idsec[0]);
    console.log(cache.get('id'))
    cache.put('secret', idsec[1]);
    console.log(cache.get('secret'))
    cache.put('email', req.params.email);
  
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
