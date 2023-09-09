import express from "express";
import { createUser, loginUser, logoutUser, profileUser } from "../controllers/userController.js";
import { isAuth } from "../middleware/auth.js"; 

export const userRouter = express.Router()

userRouter.post('/new',createUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',isAuth ,logoutUser)
userRouter.get('/profile',isAuth ,profileUser) 