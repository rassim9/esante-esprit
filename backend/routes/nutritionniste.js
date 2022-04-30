const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const NutritionnisteController = require('../controllers/nutritionniste');
const auth = require('../middleware/auth');
const Nutritionniste = require('../models/nutritionniste');


router.get('/:email',NutritionnisteController.fetchAll)
router.get('/3/:id',NutritionnisteController.fetchlast)

router.post(
  '/',
  [

    body('patient').trim().isLength({ min: 2 }).not().isEmpty(),
    body('medecin').trim().isLength({ min: 2 }).not().isEmpty(),
    body('Activite'),
    body('Tabac'),
    body('diabete'),
    body('Consultation'),
    body('Regime'),
    body('Reguliere'),
    body('Alimentation'),
    body('Hydratation'),
    body('Obesite'),
    body('Pds'),
    body('note')
  ],
  NutritionnisteController.postNutritionniste
);

router.delete('/:id',  NutritionnisteController.deleteNutritionniste);

module.exports = router;

