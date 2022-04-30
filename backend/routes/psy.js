const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const PsyController = require('../controllers/psy');
const auth = require('../middleware/auth');
const Psy = require('../models/psy');


router.get('/:email',PsyController.fetchAll)
router.get('/3/:id',PsyController.fetchlast)

router.post(
  '/',
  [

    body('patient').trim().isLength({ min: 2 }).not().isEmpty(),
    body('medecin').trim().isLength({ min: 2 }).not().isEmpty(),
    body('trouble'),
    body('addictions'),
    body('difficultes'),
    
    body('note')
  ],
  PsyController.postPsy
);

router.delete('/:id',  PsyController.deletePsy);

module.exports = router;

