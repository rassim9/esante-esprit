const express = require('express');

const msgController = require('../controllers/message');

const router = express.Router();

router.get('/mymsg/:email',msgController.getAllmessage);
router.get('/myallmsg/:email',msgController.myAllmessage);

router.post('/',msgController.postmessage);
router.delete('/:id',msgController.deletemsg);


module.exports=router;