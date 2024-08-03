const express = require("express")
const zod = require('zod')
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken")
const { User,Accounts} = require("../db");
const { JWT_SECRET }  =  require("../config");
const  authMiddleware = require("../middleware")

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    userName:zod.string().email(),
    password:zod.string()
})


const signinSchema = zod.object({
    userName:zod.string().email(),
    password:zod.string()
})

const updateSchema = zod.object({
    password:zod.string().optional(),
    firstName: zod.string().optional(), 
    lastName: zod.string().optional()
})

router.post("/signup",async(req,res)=>{
  const body = req.body
  const {success,error} = signupSchema.safeParse(body)
  if(!success){
    console.log(error)
    return res.status(400).json({
        message: "Email already taken / Incorrect inputs"
    })
  }
  const existingUser = await User.findOne({userName:body.userName})
  if(existingUser){
    console.log(error)
    return res.json({
        message: "Email already taken / Incorrect inputs"
    })
  }
  const newUser = await User.create({
    firstName:body.firstName,
    lastName:body.lastName,
    userName:body.userName,
    password:body.password
  })

  const userId  = newUser._id
// create a user related account 

await Accounts.create({
    userId:userId,
    balance: 1 + Math.random() * 10000
})

  const jwt = jsonwebtoken.sign({
    userId
  }, JWT_SECRET)
  res.json({
	message: "User created successfully",
	token: jwt
})

})

router.post("/signin",async (req,res)=>{
  const body  = req.body
  const {success} = signinSchema.safeParse(body)
  if(!success){
    return res.json({
        message: "Email already taken / Incorrect inputs"
    })
  }
  const existingUser = await User.findOne({userName:body.userName,password:body.password})
  if(!existingUser){
    return res.json({
        message: "Error while logging in"
    })
  }
  const userId = existingUser._id
  const jwt = jsonwebtoken.sign({userId},JWT_SECRET)
  res.json({
	token: jwt
})

})


router.put("/",authMiddleware,async(req,res)=>{

    const body = req.body;
    const {success} = updateSchema.safeParse(body)
    if(!success){
        return res.status(411).json({
            msg:"Invalid Inputs"
    });
    }
    await User.updateOne({
        _id:req.userId
    },body)
    res.status(200).json({
        msg: "Updated Successfully"
    })
})

router.get("/bulk",authMiddleware,async(req,res)=>{
    const filter = req.query.filter || ""
    if(!filter.trim()){
        return res.json([]);
    }

    try {
        const users = await User.find({
            $or: [
                {
                    firstName:{"$regex":filter}
                },
                {
                    lastName:{"$regex":filter}
                }
            ]
        })
    
        res.json({
            user: users.map((user)=>({
                userName : user.userName,
                firstName : user.firstName,
                lastName : user.lastName,
                id: user._id
            }))
    })
    } catch (error) {
        res.status(500).json({
            error:"Internal Server error"
        })
        
    }
})

router.get("/name",authMiddleware,async (req,res)=>{
    // console.log("User ID from auth middleware:", req.userId);
    const selectedUser =  await User.findOne({
        _id:req.userId
    })
    res.status(200).json({
        name:selectedUser.firstName
    })
})

module.exports = router;