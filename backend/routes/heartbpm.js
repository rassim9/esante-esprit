const express = require('express');

const heartbpmController = require('../controllers/heartbpm');

const router = express.Router();

router.get('/',heartbpmController.getAllheartbpm);



module.exports=router;