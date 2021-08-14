const express = require('express');

const heartminController = require('../controllers/heartmin');

const router = express.Router();

router.get('/',heartminController.getAllheartmin);



module.exports=router;