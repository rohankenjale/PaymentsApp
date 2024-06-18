const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { User,Account } = require('../db');
require('dotenv').config()
const authMiddleware = require('../middleware');
const router = express.Router();

router.post('/signup',async (req,res)=>{
    const newUser =  await User.create({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password,
        })
    const userId = newUser.id;
    await Account.create({
        userId,
        balance: Math.floor(1 + Math.random() * 10000)
    })
    const token = jwt.sign({ userId },process.env.JWT_SECRET)
    res.json({
        message: 'User created successfully',
        token: token
    })
})

router.post('/signin', async (req,res)=>{
    const alreadyUser = await User.findOne({
        username : req.body.username,
        password: req.body.password
    })

    if (!alreadyUser) {
        res.json({
            message: ' User does not exist'
        })
    }
    const token = jwt.sign({
        userId: alreadyUser._id
    }, process.env.JWT_SECRET)
    res.json({
        token : token
    })

})

router.put("/update", authMiddleware, async (req, res) => {
	await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

router.get('/users',authMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
    const me = await User.findOne({
        _id:req.userId
    })
    console.log(me)
    res.json({
        firstname:me.firstname,
        user : users.map(user=>({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            id : user.id
        }))
    })
})

module.exports = router;