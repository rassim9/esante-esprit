const express = require('express');

const caloriesController = require('../controllers/calories');

const router = express.Router();

router.get('/',caloriesController.getallcalories);



module.exports=router;