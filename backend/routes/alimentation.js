const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const alimentationController = require('../controllers/alimentation');
const auth = require('../middleware/auth');



router.get('/my/:email',alimentationController.fetchmy)
router.get('/myalimentation/:email',alimentationController.fetchmyAlimentation)
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
  alimentationController.postAlimentation
);

router.delete('/:id', alimentationController.deleteAlimentation);

module.exports = router;

