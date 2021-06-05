const express = require('express');

const pasController = require('../controllers/pas');

const router = express.Router();

router.get('/',pasController.getAllPas);



module.exports=router;