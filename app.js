import { configDotenv } from "dotenv";
import express from "express";
import { userRouter } from "./routes/userRoute.js";
import { itemRoute } from "./routes/itemRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
app.use(express.json()); 
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

configDotenv({path:'./database/config.env'});

app.use('/api/v1',userRouter);
app.use('/api/v1',itemRoute)