import mongoose from "mongoose";

export const DB = mongoose.connect(process.env.MONGO_URI, {
    dbName : "CRUD"
}).then((c)=>{
    console.log(`connected to database ${c.connection.host}`);
}).catch((error)=>{
    console.log(error);
}) 