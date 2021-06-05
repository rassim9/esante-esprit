const express = require('express');

const rdvController = require('../controllers/rdv');

const router = express.Router();

router.get('/myrdv/:id',rdvController.getAllRdv);
router.post('/',rdvController.postRdv);
router.delete('/:id',rdvController.deleteRdv);


module.exports=router;