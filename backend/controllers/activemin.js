const activemin = require('../models/activemin');

exports.getAllActivemin = async(req,res,next) => {
    try {
const [AllActivemin] = await activemin.fetchAll();
res.status(200).json(AllActivemin);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};


