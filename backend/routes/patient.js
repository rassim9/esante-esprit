const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const patientController = require('../controllers/patient');
const auth = require('../middleware/auth');


router.get('/',patientController.fetchAll)

router.post(
  '/',
  [
    body('email').trim().isLength({ min: 5 }).not().isEmpty(),
    body('patientid').trim().isLength({ min: 5 }).not().isEmpty(),
    body('secret').trim().not().isEmpty(),
  ],
  patientController.postPatient
);

router.delete('/:id', patientController.deletePatient);
router.get('/patientid/:id', patientController.postid);

module.exports = router;

