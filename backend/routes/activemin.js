const express = require('express');

const activeminController = require('../controllers/activemin');

const router = express.Router();

router.get('/',activeminController.getAllActivemin);



module.exports=router;