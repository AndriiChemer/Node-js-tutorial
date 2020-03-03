var jwt = require('jsonwebtoken');

//Checking user authorization token

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            error: error,
            message: 'Auth faild!', 
            status: 401
        });
    }
    
    
};