const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const patientController = require('../controllers/patient');
const auth = require('../middleware/auth');
router.get('/patients',patientController.fetchAllpatients)

router.get('/count',patientController.count)
router.get('/count/:email',patientController.countp)
router.get('/:email',patientController.fetchAll)
router.get('/mydata/:email',patientController.mydata)
router.get('/my/:email',patientController.fetchmy)
router.get('/op/:email',patientController.fetchop)
router.put('/',patientController.update);


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
    body('type').trim().not().isEmpty(),
    body('rpps').trim().not().isEmpty(),
    body('dateint').trim().not().isEmpty(),
    body('imc').trim().not().isEmpty(),
    body('classe').trim().not().isEmpty(),
    body('img').trim().not().isEmpty(),
    body('classeimg').trim().not().isEmpty(),
    body('pideal').trim().not().isEmpty(),
    body('medecin').trim().not().isEmpty(),
    body('Nutritionniste').trim().not().isEmpty(),
    body('Psychologue').trim().not().isEmpty(),
    body('Cardiologue').trim().not().isEmpty(),
    body('Soignant').trim().not().isEmpty(),
    body('autre').trim().not().isEmpty(),
    body('operable').trim().not().isEmpty(),
  ],
  patientController.postPatient
);

router.delete('/:id', patientController.deletePatient);
router.get('/patientid/:email', patientController.postid);

module.exports = router;

