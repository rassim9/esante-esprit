const Pas = require('../models/pas');

exports.getAllPas = async(req,res,next) => {
    try {
const [allPas] = await Pas.fetchAll();
res.status(200).json(allPas);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};


