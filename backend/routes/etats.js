const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const etatsController = require('../controllers/etats');
const auth = require('../middleware/auth');


router.get('/', auth,etatsController.fetchAll)

router.post(
  '/',
  [
    auth,
    body('forme').trim().isLength({ min: 5 }).not().isEmpty(),
    body('desc').trim().isLength({ min: 10 }).not().isEmpty(),
    body('username').trim().not().isEmpty(),
  ],
  etatsController.postEtat
);

router.delete('/:id', auth, etatsController.deleteEtat);

module.exports = router;

