const Pesage = require('../models/pesage');

exports.getAllPesages = async(req,res,next) => {
    try {
const [allPesages] = await Pesage.fetchAll();
res.status(200).json(allPesages);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};


exports.postPesages = async(req,res,next) => {
    try {
const postResponse = await Pesage.post(req.body.poids);
res.status(201).json(postResponse);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};

exports.putPesages = async(req,res,next) => {
    try {
const putResponse = await Pesage.update(req.body.id,req.body.poids);
res.status(200).json(putResponse);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};
exports.deletePesages = async(req,res,next) => {
    try {
const deleteResponse = await Pesage.delete(req.params.id);
res.status(200).json(deleteResponse);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};