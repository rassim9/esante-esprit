const express = require('express');

const poidsController = require('../controllers/poids');

const router = express.Router();

router.get('/',poidsController.getAllPoids);
router.get('/;email',poidsController.getmyPoids);


module.exports=router;