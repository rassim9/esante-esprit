const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.fetchAll = async (req, res, next) => {
  const id = req.body.id;
  try {
   
    const [allUsers] = await User.fetchAll(id);
    
    if ([allUsers][0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    else{
    res.status(200).json(allUsers);}
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.findid = async (req, res, next) => {
  try {
    
    const [idResponse] = await User.findid(req.params.id);
   

     res.status(200).json(idResponse);
    
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  
}