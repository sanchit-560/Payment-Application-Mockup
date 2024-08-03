const { JWT_SECRET }  = require("./config");
const jsonwebtoken = require('jsonwebtoken')
const authMiddleware = (req,res,next)=>{

let headers = req.headers.authorization 
if(!headers|| !headers.startsWith("Bearer ")){
    res.json({
        msg:" Wrong authorization header"
    })
}
const updatedHeader = headers.split(" ")[1]
try {
    const decode = jsonwebtoken.verify(updatedHeader,JWT_SECRET)
    if(decode.userId){
        req.userId = decode.userId
        next();
    }
} catch (error) {
        return res.status(403).json({
            msg: error
        })
}
};
module.exports = authMiddleware