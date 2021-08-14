const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const patientController = require('../controllers/patient');
const auth = require('../middleware/auth');

router.get('/count',patientController.count)
router.get('/count/:id',patientController.countp)
router.get('/:id',patientController.fetchAll)
router.get('/mydata/:email',patientController.mydata)
router.get('/my/:id',patientController.fetchmy)

router.post(
  '/',
  [
    body('email').trim().isLength({ min: 5 }).not().isEmpty(),
    body('patientid').trim().isLength({ min: 5 }).not().isEmpty(),
    body('secret').trim().not().isEmpty(),
    body('nom').trim().not().isEmpty(),
    body('prenom').trim().not().isEmpty(),
    body('sexe').trim().not().isEmpty(),
    body('age').trim().not().isEmpty(),
    body('poids').trim().not().isEmpty(),
    body('taille').trim().not().isEmpty(),
    body('periode').trim().not().isEmpty(),
    body('etat').trim().not().isEmpty(),
    body('dateint').trim().not().isEmpty(),
    body('imc').trim().not().isEmpty(),
    body('classe').trim().not().isEmpty(),
    body('img').trim().not().isEmpty(),
    body('classeimg').trim().not().isEmpty(),
    body('pideal').trim().not().isEmpty(),
    body('medecin').trim().not().isEmpty(),

  ],
  patientController.postPatient
);

router.delete('/:id', patientController.deletePatient);
router.get('/patientid/:id', patientController.postid);

module.exports = router;

