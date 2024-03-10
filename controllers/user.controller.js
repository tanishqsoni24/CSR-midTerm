const express = require("express")
const User = require("../models/user.model")

const createUser = async (req, res)=>{
    console.log(req.body)
    const { name, age, place } = req.body;
    const user = await User.create({
        name,
        age,
        place
    })
    console.log(user," $$$$$$$$$$$$ ")
    if(!user) return res.status(400).json({
        "status" : "failed",
        "message" : "User Not Created"
    })
    return res.status(200).json({
        "status" : "success",
        user,
        "message" : "User Created Successfully"
    })
}

const getUser = async (req, res)=>{
    const users = await User.find()
    if(!users) return res.status(400).json({
        "status" : "failed",
        "message" : "no users found"
    })
    console.log("inside here")
    return res.status(200).json({
        "status" : "success",
        users,
        "message" : "user fetched successfully"
    })
}

const update = async (req, res)=>{
    const userId = req.params.id;
    console.log(req.params)
    const { name, age, place } = req.body;
    
    const user = await User.findById(userId);
    if(name) user.name = name;
    if(age) user.age = age;
    if(place) user.place = place;

    user.save()
    res.status(200).json({
        "status" : "success",
        user,
        "message" : "Updated Successfully"
    })
}

const updateFull = async (req, res)=>{
    const userId = req.params.id;
    console.log(userId)
    const {name, age, place} = req.body;

    if(!name && !age && !place) return res.status(400).json({
        "status" : "failed",
        "message" : "Partial Updation not Allowed"
    })

    const user = await User.findOneAndUpdate({
        _id : userId,
    },{
        name,
        age,
        place
    })

    if(!user) return res.status(400).json({
        "status" : "failed",
        "message" : "somethig went wrong"
    })

    return res.status(200).json({
        "status" : "success",
        "message" : "Updated Successfully"
    })
}

const deleteUser = async (req, res) =>{
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId)

    if(!user) return res.status(400).json({
        "status" : "failed",
        "message" : "somethig went wrong"
    })

    return res.status(200).json({
        "status" : "success",
        "message" : "user deleted successfully"
    })
}

module.exports = {
    createUser,
    getUser,
    update,
    updateFull,
    deleteUser
}
