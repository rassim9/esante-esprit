const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const medicamentController = require('../controllers/medicament');
const auth = require('../middleware/auth');
const Medicament = require('../models/medicament');



router.get('/my/:email',medicamentController.fetchmy)
router.get('/mymedicament/:email',medicamentController.fetchmymedicament)
router.post(
  '/',
  [
    body('nom').trim().not().isEmpty(),
    body('dosage').trim().not().isEmpty(),
    body('duree').trim().not().isEmpty(),
    body('autre').trim().not().isEmpty(),
    body('patient').trim().not().isEmpty(),
    body('email').trim().not().isEmpty(),
   

  ],
  medicamentController.postMedicament
);

router.delete('/:id', medicamentController.deleteMedicament);

module.exports = router;

