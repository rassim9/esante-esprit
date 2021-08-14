const calories = require('../models/calories');

exports.getallcalories = async(req,res,next) => {
    try {
const [Allcalories] = await calories.fetchAll();
res.status(200).json(Allcalories);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};


