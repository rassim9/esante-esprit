const express = require('express');

const userController = require('../controllers/user');

const { body } = require('express-validator');
const auth = require('../middleware/auth');



const router = express.Router();

router.get('/',userController.fetchAll);
router.get('/all',userController.fetchallemail);
router.get('/:id',userController.findid);

module.exports = router;