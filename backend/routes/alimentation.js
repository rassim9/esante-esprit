const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const alimentationController = require('../controllers/alimentation');
const auth = require('../middleware/auth');



router.get('/my/:id',alimentationController.fetchmy)
router.get('/myalimentation/:email',alimentationController.fetchmyAlimentaion)
router.post(
  '/',
  [
    body('deb').trim().not().isEmpty(),
    body('fin').trim().not().isEmpty(),
    body('heure').trim().not().isEmpty(),
    body('aliment').trim().not().isEmpty(),
    body('qte').trim().not().isEmpty(),
    body('email').trim().not().isEmpty(),
   

  ],
  medicamentController.postMedicament
);

router.delete('/:id', medicamentController.deleteMedicament);

module.exports = router;

