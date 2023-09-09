import { Item } from "../models/ItemModel.js";

export const cteateItem = async(req,res) => {
    try {
        const {name,price,quantity} = req.body;
        let item = await Item.findOne({name});
        if(item){
            return res.status(404).json({
                success:false,
                message:"Item Already Exists",
            })
        }
        item = await Item.create({name,price,quantity,user:req.user._id});
        res.status(201).json({
            success:true,
            message:"Item created Successfully",
            item,
        })
    } catch (error) {
        console.log(error);
    }
}
export const Items = async(req,res) => {
    try { 
        const items = await Item.find({user:req.user._id});
        res.status(201).json({
            success:true,
            message:"All items Here.",
            items,
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateItem = async(req,res) => {
    try {
        const {name,price,quantity} = req.body;
        let item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Item Not Exists",
            })
        }
        item = await Item.findByIdAndUpdate(req.params.id,{$set:{name,price,quantity}});
        res.status(201).json({
            success:true,
            message:"Item updated Successfully",
            item,
        })
    } catch (error) {
        console.log(error);
    }
}
export const deleteItem = async(req,res) => {
    try { 
        let item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Item Not Exists",
            })
        }
        item = await Item.findByIdAndDelete(item);
        res.status(201).json({
            success:true,
            message:"Item deleted Successfully",
            item,
        })
    } catch (error) {
        console.log(error);
    }
}