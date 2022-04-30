const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const operationController = require('../controllers/operation');
const auth = require('../middleware/auth');

const Operation = require('../models/operation');


router.get('/my/:email',operationController.fetchmy)
router.get('/myoperation/:email',operationController.fetchmyOperation)
router.post(
  '/',
  [
    body('patient').trim().not().isEmpty(),
    body('medecin').trim().not().isEmpty(),
    body('etablissement').trim().not().isEmpty(),
    body('date').trim().not().isEmpty(),
    body('heure').trim().not().isEmpty(),
    body('precautions').trim().not().isEmpty(),
    body('note').trim().not().isEmpty(),
   

  ],
  operationController.postOperation
);

router.delete('/:id', operationController.deleteOperation);
router.get('/email/:email', operationController.postid);

module.exports = router;

