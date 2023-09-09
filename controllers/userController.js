import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/feture.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(404).json({
                success:false,
                message:"Account already exists",
            })
        }
        const hashPass = await bcrypt.hash(password,10);
        user = await User.create({ name, email, password:hashPass });
        res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Email and Password Inurrect",
            })
        }
        const isCompare = await bcrypt.compare(password,user.password);
        if(!isCompare){
            return res.status(404).json({
                success:true,
                message:"Email and Password Inurrect",
            })
        }
        createCookie(user,res,"Login Successfully")
    } catch (error) {
        console.log(error);
    }
}
export const logoutUser = async(req,res) => {
    try {
        res.status(200).cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly:false,
            sameSite: process.env.NODE_ENV === "Development" ? 'lax' : 'none',
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            success:true,
            message:'Logout Successfully',
        })
    } catch (error) {
        console.log(error);
    }
}
export const profileUser = async(req,res) => {
    try { 
        res.status(200).json({
            success:true, 
            user:req.user,
        })
    } catch (error) {
        console.log(error);
    }
}