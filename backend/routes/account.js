
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require('mongoose');

const express = require('express')
const router = express.Router();
router.use(express.json());
router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    });
    res.json({
        balance:account.balance
    })

})
router.post("/transfer", authMiddleware, async (req, res) => {
    console.log(req.body);
    const session = await mongoose.startSession();

    session.startTransaction();
    // const { to,amount } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < req.body.amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: req.body.to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -req.body.amount } }).session(session);
    await Account.updateOne({ userId: req.body.to }, { $inc: { balance: req.body.amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
module.exports = router;