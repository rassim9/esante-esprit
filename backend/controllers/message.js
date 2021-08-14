const { validationResult } = require('express-validator');
const Message = require('../models/message');

exports.getAllmessage = async(req,res,next) => {
    try {
const [allmsg] = await Message.fetchAll(req.params.email);
res.status(200).json(allmsg);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};

exports.myAllmessage = async(req,res,next) => {
  try {
const [allmsg] = await Message.myAll(req.params.email);
res.status(200).json(allmsg);
  }catch(err) {
if (!err.statusCode){
  err.statusCode = 500
}
next(err);
  }
};

exports.postmessage = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return;
  
    const email = req.body.email;
    const dest = req.body.dest;
    const object = req.body.object;
    const message = req.body.message;
  
    try {
      const msgdetails = {
        email: email,
        dest: dest,
        object: object,
        message: message,
      };
      const result = await Message.save(msgdetails);
      res.status(201).json({ message: 'Posted!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.deletemsg = async(req,res,next) => {
    try {
const deleteResponse = await Message.delete(req.params.id);
res.status(200).json(deleteResponse);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};