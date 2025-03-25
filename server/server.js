import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app=express(); 
const port=process.env.PORT||5000
connectDB();

const allowedOrigins=['http://localhost:5173'];


app.use(cors({
    origin: allowedOrigins[0],
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

}));
app.use(express.json());
app.use(cookieParser());


app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});



//API Endpoints
app.get('/',(req,res)=>res.send("API working"));
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(port,()=>console.log(`Server started on PORT:${port}`));