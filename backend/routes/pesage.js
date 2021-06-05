const express = require('express');

const pesageController = require('../controllers/pesage');

const router = express.Router();

router.get('/',pesageController.getAllPesages);
router.post('/',pesageController.postPesages);
router.put('/',pesageController.putPesages);
router.delete('/:id',pesageController.deletePesages);


module.exports=router;