const express = require("express")
const { createUser, getUser, update, updateFull, deleteUser } = require("../controllers/user.controller")

const userRouter = express.Router();

// APIs

userRouter.route("/create").post(createUser);
userRouter.route("/getUser").get(getUser);
userRouter.route("/update/:id").patch(update);
userRouter.route("/updateFull/:id").put(updateFull);
userRouter.route("/delete/:id").delete(deleteUser);

module.exports = {
    userRouter
}