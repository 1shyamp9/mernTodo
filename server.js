import { app } from "./app.js";
import { DB } from "./database/database.js";

DB;

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})