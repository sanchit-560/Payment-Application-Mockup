const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')
const authMiddleware = (req,res,next)=>{
 const authHeader = req.headers.authorization;
 if(!authHeader || !authHeader.startsWith("Bearer ")){
   return res.json({
    message:req.headers, error:"Auth error"
   }) 
 }
 const token = authHeader.split(" ")[1];
 try {
    const verify = jwt.verify(token,JWT_SECRET);
    if(verify.userId){
        req.userId=verify.userId;
        console.log("done");
        next();
    }
 } catch (error) {
    return res.status(403).json({
      error:error
    });
 }
}
module.exports = {authMiddleware}