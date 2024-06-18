const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { User, Account } = require('../db');
const authMiddleware = require('../middleware');
const router = express.Router();


router.get('/balance',authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    })
    res.json({
        balance : account.balance
    })
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    const fromAccount = await Account.findOne({
        userId : req.userId
    }).session(session)
    if (fromAccount.balance < amount ) {
        await session.abortTransaction();
        res.status(400).json({message: 'Insufficient Balance'})
    }

    const toAccount = await Account.findOne({ userId : to}).session(session)
    if (!toAccount ) {
        await session.abortTransaction();
        res.status(400).json({message: 'Invalid Account'})
    }
    
    await Account.findOneAndUpdate({userId:fromAccount.userId},{$inc : {balance : - amount}}).session(session)
    await Account.findOneAndUpdate({userId:to},{$inc : {balance : amount}}).session(session)
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;