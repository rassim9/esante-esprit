const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const CardiologueController = require('../controllers/cardiologue');
const auth = require('../middleware/auth');
const Cardiologue = require('../models/cardiologue');


router.get('/:email',CardiologueController.fetchAll)
router.get('/3/:id',CardiologueController.fetchlast)

router.post(
  '/',
  [

    body('patient').trim().isLength({ min: 2 }).not().isEmpty(),
    body('medecin').trim().isLength({ min: 2 }).not().isEmpty(),
    body('hospitalise'),
    body('accident'),
    body('prob'),
    body('anomalie'),
    body('traitement'),
    body('symptome'),
    body('note')
  ],
  CardiologueController.postCardiologue
);

router.delete('/:id',  CardiologueController.deleteCardiologue);

module.exports = router;

