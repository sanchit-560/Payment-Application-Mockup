const express = require('express');
const router = express.Router();
const app = express();
const z = require('zod');
const { Account, User } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../config")
const {authMiddleware} = require("../middleware");
const SignUpSchema = z.object({
    userName:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})
router.use(express.json());
router.post("/signup",async (req,res)=>{
// console.log("hello")
const {success} = SignUpSchema.safeParse(req.body)
if(!success){
    res.status(400).json({
        message:"Invalid inputs"
    })
    return;
}
const user = await User.findOne({
    userName:req.body.userName
});
//we now have the user and check whether they have a set id or not if they have, no error message, else say the email id is taken
if(user){
   res.status(411).json({
        message: "Email already taken / Incorrect inputs"
   })
   return;
}
const newUser = await User.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    password:req.body.password
})
// console.log(newUser.firstName)
const token = jwt.sign({userId:newUser._id},JWT_SECRET)
await Account.create({
    userId: newUser._id,
    balance: 1+ Math.random()*10000
})
res.status(200).json({
        message: "User created successfully",
        token: token
})
})





const SignInSchema = z.object({
    userName:z.string().email(),
    password:z.string()
})
router.post("/signin",async (req,res)=>{
const {success} = SignInSchema.safeParse(req.body)
if(!success){
    res.status(400).json({
        message:"Invalid inputs"
    })
    return;
}
const user =  await User.findOne({
    userName:req.body.userName,
    password:req.body.password
})
if(!user || user.password !== req.body.password){
    return res.status(411).json({
        message: "wrong username or password"
})
}
const token = jwt.sign({
    userId: user._id
}, JWT_SECRET);

res.json({
    token: token
})
})



 
const UpdateSchema = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})
router.put("/",authMiddleware,async(req,res)=>{
    const {success} = UpdateSchema.safeParse(req.body)
    if(!success){
         return res.status(411).json({
          message: "Error while updating information"
         })
    }
    await User.updateOne(req.body,{
      _id:req.userId
    })/// potential mistake come back to ioy
    res.json({
      message: "Updated successfully"
    })
  })
  
  router.put("/bulk",async (req,res)=>{
      const filter = req.query.filter || ""
      const users = await User.find({
          $or:[{
              firstName:{"$regex": filter}
          },
          {
              lastName:{"$regex": filter}
          }
      ]
      })
  
      res.status(200).json({
       user:users   
      })
  })
module.exports = router;