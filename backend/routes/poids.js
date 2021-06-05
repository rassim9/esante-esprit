const express = require('express');

const poidsController = require('../controllers/poids');

const router = express.Router();

router.get('/',poidsController.getAllPoids);



module.exports=router;