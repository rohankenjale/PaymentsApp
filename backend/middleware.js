const jwt = require('jsonwebtoken');
require('dotenv').config()
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if (decoded.userId) {
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: 'error'
        })
    }
    
}

module.exports = authMiddleware;