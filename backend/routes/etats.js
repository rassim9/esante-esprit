const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const etatsController = require('../controllers/etats');
const auth = require('../middleware/auth');


router.get('/:id',etatsController.fetchAll)

router.post(
  '/',
  [

    body('forme').trim().isLength({ min: 5 }).not().isEmpty(),
    body('description').trim().isLength({ min: 10 }).not().isEmpty(),
    body('temp').trim().not().isEmpty(),
    body('pansement'),
    body('saignment'),
    body('medicament'),
    body('douleur'),
    body('niveau'),
    body('username').trim().not().isEmpty(),
  ],
  etatsController.postEtat
);

router.delete('/:id',  etatsController.deleteEtat);

module.exports = router;

