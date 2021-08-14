const heartmin = require('../models/heartmin');

exports.getAllheartmin = async(req,res,next) => {
    try {
const [Allheartmin] = await heartmin.fetchAll();
res.status(200).json(Allheartmin);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};


