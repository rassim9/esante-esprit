const heartbpm = require('../models/heartbpm');

exports.getAllheartbpm = async(req,res,next) => {
    try {
const [Allheartbpm] = await heartbpm.fetchAll();
res.status(200).json(Allheartbpm);
    }catch(err) {
if (!err.statusCode){
    err.statusCode = 500
}
next(err);
    }
};


